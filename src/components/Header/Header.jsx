import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/amazonlogo.png';
import usa from '../../assets/usaflag.png';
import './Header.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Lowerheader from './Lowerheader';
import { DataContext } from '../Dataprovider/Dataprovider';
import { auth } from '../../../Utility/Firebase';

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [notification, setNotification] = useState(null);  // State for notifications

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  const handleSignOut = () => {
    if (user) {
      setNotification(`You are signed out, ${user.email.split('@')[0]}`);
      setTimeout(() => setNotification(null), 3000);  // Clear the notification after 3 seconds
      auth.signOut();
    }
  };

  return (
    <div className="fixed">
      <header>
        {notification && <div className="notification">{notification}
          </div>}  {/* Show notification if notification exist*/}
        <Link to="/">
          <img src={logo} className="hover logo" alt="Amazon Logo" />
        </Link>
        <div className="hover address">
          <LocationOnIcon className="hover white" />
          <p className="hover white">Deliver to Ethiopia</p>
        </div>

        <div className="hover search-area">
          <select name="category" id="category">
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="home_kitchen">Home and Kitchen</option>
          </select>
          <input className="hover search" type="text" placeholder="Search Amazon" />
          <div className="hover search-icon">
            <SearchIcon />
          </div>
        </div>
        <div className="lang-section">
          <img className="usa-flag" src={usa} alt="" />
          <select className="lang" name="lang" id="lang">
            <option value="En">EN</option>
          </select>
        </div>
        <div className="user-actions">
          <div className="hover signin-div">
            {!user ? (
              <Link to="/auth">
                <div className="signin">
                  <p>Hello, Sign in</p>
                  <p className="white">Accounts & Lists</p>
                </div>
              </Link>
            ) : (
              <div className="signin" onClick={handleSignOut}>
                <p>Hello, {user?.email?.split('@')[0]}</p>
                <span>Sign Out</span>
              </div>
            )}
          </div>
          <Link to="/Orders">
            <div className="hover order">Returns & Orders</div>
          </Link>
          <div className="hover cart">
            <Link to="/cart">
              <ShoppingCartIcon />
              <span className="cart-count">{totalItem}</span>
            </Link>
          </div>
        </div>
      </header>
      <Lowerheader />
    </div>
  );
}

export default Header;
