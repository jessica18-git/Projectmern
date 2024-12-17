import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Packages() {
  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <Route path="/" exact component={Packages} />
        </div>
        <div className="right-sidebar">
          <Cart />
          <Offers />
          <UCPromise />
        </div>
      </div>
    </Router>
  );
}

function Packages() {
  return (
    <div className="packages-section">
      <h2>Packages</h2>
      <div className="package-item">
        <p className="package-label">PACKAGE</p>
        <h4>Complete honey waxing</h4>
        <p className="rating">4.85 (1.8M reviews)</p>
        <p className="price">₹626 <span className="original-price">₹736</span> • 1 hr 10 mins</p>
        <ul>
          <li><strong>Waxing:</strong> Full arms (including underarms), Full legs (no bikini and no brazilian)</li>
          <li><strong>Facial hair removal:</strong> Eyebrow, Upper lip</li>
        </ul>
        <button className="edit-button">Edit your package</button>
        <button className="add-button">Add</button>
      </div>
      {/* Add more package items as needed */}
    </div>
  );
}

function Cart() {
  return (
    <div className="cart-section">
      <img src="cart-image.png" alt="Cart" />
      <p>No items in your cart</p>
    </div>
  );
}

function Offers() {
  return (
    <div className="offers-section">
      <p>Save 10% on every order</p>
      <p>Get Plus now</p>
      <button>View More Offers</button>
    </div>
  );
}

function UCPromise() {
  return (
    <div className="uc-promise-section">
      <h3>UC Promise</h3>
      <ul>
        <li>4.5+ Rated Beauticians</li>
        <li>Luxury Salon Experience</li>
        <li>Premium Branded Products</li>
      </ul>
    </div>
  );
}

export default Packages;
