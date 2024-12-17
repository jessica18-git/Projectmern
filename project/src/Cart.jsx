import React from 'react';
import { Link } from 'react-router-dom';
import cart1 from './cart1.png';
function Cart() {
  return (
    <div className="cart-container">
      <button className="back-button" onClick={() => window.history.back()}>&larr;</button>
      <div className="cart-content">
        <img src={cart1} alt="Empty Cart Icon" className="cart-icon" />
        <h2>Your cart is empty</h2>
        <p>Let's add some services</p>
        <Link to="/services" className="explore-button">
          Explore services
        </Link>
      </div>
    </div>
  );
}

export default Cart;
