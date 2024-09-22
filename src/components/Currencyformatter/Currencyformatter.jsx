import React from 'react'
import numeral from 'numeral'
function Currencyformatter({amount}) {
    const formattedamount=numeral(amount).format("$0,0.00")

  return (
    <div>{formattedamount}</div>
  )
}

export default Currencyformatter