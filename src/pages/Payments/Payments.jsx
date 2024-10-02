import React, { useContext, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import classes from './payment.module.css';
import { DataContext } from '../../components/Dataprovider/Dataprovider';
import Productcard from '../../components/products/Productcard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Currencyformatter from '../../components/Currencyformatter/Currencyformatter';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../components/Api/axios';
import { ClipLoader } from 'react-spinners';
import { doc, collection, setDoc } from 'firebase/firestore';
import { db } from '../../../Utility/Firebase'; // Ensure correct import

function Payments() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

  const [carderror, setcarderror] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe(); // Stripe instance
  const elements = useElements(); // Elements for card

  const navigate = useNavigate();

  const handlecarderror = (e) => {
    e?.error?.message ? setcarderror(e?.error?.message) : setcarderror('');
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: 'POST',
        url: `/payment/create?total=${total * 100}`,
      });
  
      const clientSecret = response.data?.clientSecret; // Ensure this exists
  
      // Check if clientSecret is valid
      if (!clientSecret) {
        throw new Error('Client secret is missing');
      }
  
      // Confirm payment with Stripe
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
  
      // Storing the order in Firestore after payment success
      if (paymentIntent) {
        const orderRef = doc(collection(db, 'users', user.uid, 'orders'), paymentIntent.id);
        await setDoc(orderRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
  
        // Clear the basket after successful payment
        dispatch({ type: 'EMPTY_BASKET' });
  
        setProcessing(false);
        navigate('/orders', { state: { msg: 'You have placed a new order' } });
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.log('Payment error:', error);
      setProcessing(false);
    }
  };
  

  return (
    <Layout>
      <div className={classes.checkout}>CheckOut ({totalItem}) items</div>
      <hr className={classes.hr} />

      <div className={classes.paymentflexs}>
        <h3>Delivery address</h3>
        <div>
          <div>{user?.email}</div>
          <div>123 React Lane</div>
          <div>Chicago, IL</div>
        </div>
      </div>

      <hr className={classes.hr} />

      <div className={classes.paymentflexs}>
        <h3>Review items and Delivery</h3>
        <div className={classes.paymentproductcard}>
          {basket?.map((item) => (
            <div className={classes.eachcard} key={item.id}>
              <Productcard product={item} flex={true} renderdesc={true} />
            </div>
          ))}
        </div>
      </div>

      <hr className={classes.hr} />

      <div className={classes.paymentflexs}>
        <h3>Payment Method</h3>
        <div className={classes.paymentfrom}>
          {carderror && <small>{carderror}!!!</small>}
          <form onSubmit={handlePayment}>
            <CardElement onChange={handlecarderror} />
            <button type="submit" disabled={processing || !stripe || !elements}>
              {processing ? (
                <div className={classes.processing}>
                  <ClipLoader color='grey' size={12} />
                  <p> Processing...</p>
                </div>
              ) : 'Pay now'}
            </button>
          </form>
        </div>
        <div className={classes.totalpayment}>
          <span>Total Order | </span> <Currencyformatter amount={total} />
        </div>
      </div>
    </Layout>
  );
}

export default Payments;
