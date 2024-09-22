import React from 'react'
import {info} from'./catagoryinfo'
import Catagorycard from './Catagorycard'
import './Catagory.css'

function Catagory() {
  return (
    <div className='catagories'>
        {info.map((singleinfo)=>{
           return <Catagorycard data={singleinfo} />
        })
        }

    </div>
  )
}

export default Catagory