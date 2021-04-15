import React from 'react';
import css from '../styles/buyWidget.css';

const BuyWidget = (props) => {
  return (
    <div className='buyWidgetWrapper'>
      <div className='buyWidget'>
        <h1 className='buyTitle'>Buy {props.product.name}</h1>
      </div>
        <div className='buyButtonFrame'>
          <div className='priceBG'>
            <div className='price'>
              {props.product.price}
            </div>
            <div className="btn_addToCart">
              <a className="addToCartLabel" href=''>Add to Cart</a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default BuyWidget;