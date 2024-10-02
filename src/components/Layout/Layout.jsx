import React from 'react'
import Header from '../Header/Header'
import classes from './layout.module.css'
function Layout({children}) {
  return (
    <div className={classes.body}>
         <Header />
        {children}
    </div>
  )
}

export default Layout