import React from 'react'
import {FadeLoader} from 'react-spinners'

function Fadeloader() {
  return (
    <div style={{
        display:'flex',
        alignItems:"center",
        justifyContent:"center",
        height:"50vh",
    }}>
        <FadeLoader color='black' />
    </div>
  )
}

export default Fadeloader