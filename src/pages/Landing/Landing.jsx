import React from 'react'
import Layout from '../../components/Layout/Layout'
import { Carousel } from 'react-responsive-carousel'
import Catagory from '../../components/catagory/Catagory'
import Products from '../../components/products/Products'
import CarouselsEffect from '../../components/carousels/CarouselsEffect'

function Landing() {
  return (
    <Layout>
     <CarouselsEffect />
        <Catagory />
        <Products />
    </Layout>
  )
}

export default Landing