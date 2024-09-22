import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/amazonlogo.png';
import usa from '../../assets/usaflag.png'
import './Header.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Lowerheader from './Lowerheader';
import { DataContext } from '../Dataprovider/Dataprovider';


function Header() {
  const [{basket},dispatch] = useContext(DataContext)

  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount+amount
  },0)

  return (
    <div className='fixed'>
    <header>
      <Link to="/">
      <img src={logo} className="logo" alt="Amazon Logo" />
      </Link>
      <div className="address">
        <LocationOnIcon className="white" />
        <p className="white">Deliver to Ethiopia</p>
      </div>

      <div className="search-area">
        <select name="category" id="category">
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="home_kitchen">Home and Kitchen</option>
        </select>
        <input className="search" type="text" placeholder="Search Amazon" />
        <div className="search-icon">
          <SearchIcon />
        </div>
      </div>
        <div className='lang-section'>
          <img className='usa-flag'src={usa} alt="" />
          <select className='lang' name="lang" id="lang">
            <option value="En">EN</option>
          </select>
        </div>
      <div className="user-actions">

        <div className='signin-div'>
          <Link to="/auth">
        <button className="signin">Sign in</button>
        <p className='white'>Accounts & Lists</p>
        </Link>
        </div>
          <Link to="/Orders">
        <div className='order'> Returns & Orders</div>
        </Link>
        {/* Cart icon with item count */}
        <div className="cart">
          <Link to="/cart">
            <ShoppingCartIcon />
            <span className="cart-count">{totalItem}</span> {/* Cart item count */}
          </Link>
        </div>

        
      </div>
    </header>
     <Lowerheader />
     </div>
  );
}

export default Header;
