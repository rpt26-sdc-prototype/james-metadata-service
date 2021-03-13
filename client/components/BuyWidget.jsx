import React from 'react';

const BuyWidget = (props) => {
  return (
    <div>
      <span className='buyTitle'>Buy {props.product.name}</span><br />
      <span className='buyButtonFrame'>{props.product.price} <button id='addToCard'>Add to Cart</button></span>
    </div>
  )
}

export default BuyWidget;