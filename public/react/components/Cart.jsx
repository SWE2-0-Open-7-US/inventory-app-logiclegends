import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState(getCartItems());

  function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <><ul>
            {cartItems.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul><Link to="/confirmation">
              <button>Proceed for checkout</button>
            </Link></>
      )}
    </div>
  );
};

export default Cart;
