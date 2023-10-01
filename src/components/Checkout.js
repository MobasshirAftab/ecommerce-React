import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/casrtSlice';

export default function Checkout() {
  const cartItems = useSelector(state=> state.cart.cart);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Cart Items</h2>
      {
        cartItems.map(item => {
          return(
            <div className='d-flex my-4 mx-2'>
              <img className='cart-img' src={item.image}/>
              <div className='my-4 mx-2'>
                <h4>{item.title}</h4>
                <h5>Pirce: ${item.price}</h5>
                <button className='btn btn-warning btn-sm' onClick={() => dispatch(removeFromCart({id:item.id}))}>Remove</button>
              </div>
            </div>
          )
        })
      }
    </div>
      
    
  )
}
