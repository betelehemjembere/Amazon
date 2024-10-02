import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing'
import Auth from './pages/Auth/Auth'
import Payments from './pages/Payments/Payments'
import Order from './pages/order/Order'
import Cart from './pages/cart/Cart'
import Results from '../src/pages/Results/Results'
import Productdetail from './components/Productdetail/Productdetail';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Protectedroute from './components/protectedroute/Protectedroute';


const stripePromise = loadStripe('pk_test_51Q2wlzG0tMBRaf3xXll4HW5fCvBaPc0arRVuVLxmSzkb8wvxx8isj2PESxcu87PxGNMEr7sM7zGtQxMVF8oNtha600wH88cyN2');

function Routing() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={< Landing/>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/payment" 
            element={
              <Protectedroute msg={"You must login to pay "} redirect={"/payment"}>
               <Elements stripe={stripePromise} >
                  <Payments />
                </Elements>
                </Protectedroute>
            }
            />
           
           

          <Route path="/orders" 
            element={
              <Protectedroute
              msg={"You must log in to access your orders"}
              redirect={"/orders"}>
              <Order />
            </Protectedroute>
              } 
          />


            <Route path="/cart" element={<Cart />} />
            <Route path="/category/:categoryname" element={<Results />} />
            <Route path="/products/:productId" element={<Productdetail />} />
        
        </Routes>
    </Router>
  )
}

export default Routing