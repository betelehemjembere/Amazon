import React, { useContext } from 'react';
import Layout from '../../components/Layout/Layout';
import { DataContext } from '../../components/Dataprovider/Dataprovider';
import Productcard from '../../components/products/Productcard';
import { Link } from 'react-router-dom'; // Don't forget to import Link
import classes from './cart.module.css';
import Currencyformatter from '../../components/Currencyformatter/Currencyformatter';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item
    });
  };

  const decrement = (id) => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id
    });
  };

  return (
    <Layout>
      <div className={classes.mainCart}>
        <div>
          <h2>Hello </h2>
          <h3>Your shopping basket</h3>
          <hr />
          {
            basket?.length === 0 ? (
              <p>Oops! No item is in your cart</p>
            ) : (
              basket?.map((item, i) => (
                <div key={i} className={classes.productRow}>
                  <div className={classes.productInfo}>
                    <Productcard product={item} flex={true} renderdesc={true} renderadd={false} />
                  </div>
                  <div className={classes.buttonContainer}>
                    <button onClick={() => increment(item)}>
                      <KeyboardArrowUpIcon />
                    </button>
                    <span>{item.amount}</span>
                    <button onClick={() => decrement(item.id)}>
                      <KeyboardArrowDownIcon />
                    </button>
                  </div>
                </div>
              ))
            )
          }
        </div>

        <div>
          {
            basket?.length !== 0 && (
              <div className={classes.subtotal}>
                <p>Subtotal ({basket?.length} items)</p>
                <Currencyformatter amount={total} />
                <span>
                  <input type="checkbox" />
                  <small>This order contains a gift</small>
                </span>
                <button>
                  <Link to="/payment">Continue to checkout</Link>
                </button>
              </div>
            )
          }
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
