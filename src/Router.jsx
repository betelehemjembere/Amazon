import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing'
import Auth from './pages/Auth/Auth'
import Payments from './pages/Payments/Payments'
import Order from './pages/order/Order'
import Cart from './pages/cart/Cart'
import Results from '../src/pages/Results/Results'
import Productdetail from './components/Productdetail/Productdetail';

function Routing() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={< Landing/>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/payment" element={<Payments />} />
            <Route path="/Orders" element={<Order />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/category/:categoryname" element={<Results />} />
            <Route path="/products/:productId" element={<Productdetail />} />
        
        </Routes>
    </Router>
  )
}

export default Routing