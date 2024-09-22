import React from 'react'
import './Header.css'

import MenuIcon from '@mui/icons-material/Menu';
function Lowerheader() {
  return (
    <>
    <ul className='lists'>
        <li className='all'>
            <MenuIcon />
            <p className='white'>All</p>
        </li>
        <li>Today's Deals</li>

        <li>
        Customer Service
        </li>
        <li> 
            Registry
        </li>
        <li>
            Gift Cards
        </li>
        <li>
            Sell
        </li>
    </ul>

    </>
  )
}

export default Lowerheader