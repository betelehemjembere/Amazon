import React from 'react'
import './Catagory.css'
import { Link } from 'react-router-dom'
function Catagorycard({data}) {
  return (
    <div className='catag-cards'>
      <Link to={`/category/${data.name}`}>
            <h2>{data.title}</h2>
        <img src={data.imglink} alt="" />
        <p>{data.name}</p>
        </Link>
       
    </div>
  )
}

export default Catagorycard