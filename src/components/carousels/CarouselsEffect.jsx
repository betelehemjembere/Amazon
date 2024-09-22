import React from 'react'
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {img} from '../../assets/Carousels-img/img'
import './Carousels.css'
function CarouselsEffect() {
  return (
    <div className='carousel'>
<Carousel
  autoPlay={true}          // Ensure "P" is capitalized for "autoPlay"
  infiniteLoop={true}
  interval={3000}          // Adjust interval (in ms), default is 3000ms (3 seconds)
  showIndicators={false}
  showThumbs={false}
  stopOnHover={false}      
>
        {
        img.map((imglink)=>{
            return <img src={imglink}/>
        })}
</Carousel>
<div className='fadebottom'></div>

    </div>
  )
}

export default CarouselsEffect