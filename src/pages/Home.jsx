import React from 'react'
import Header from '../components/Header/Header'
import Lowerheader from '../components/Header/Lowerheader'
import CarouselsEffect from '../components/carousels/CarouselsEffect'
import Catagory from '../components/catagory/Catagory'
import Products from '../components/products/Products'
function Home() {
  return (
    <>
        <Header />
        <Lowerheader />
        <CarouselsEffect />
        <Catagory />
        <Products />
    </>
  )
}

export default Home