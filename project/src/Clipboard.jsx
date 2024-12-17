import React from 'react';
import { Link } from 'react-router-dom';

function Clipboard() {
  return (
    <div className="bookings-container">
      <button className="back-button" onClick={() => window.history.back()}>&larr;</button>
      <div className="bookings-header">
        <h2>My Bookings</h2>
        <button className="help-button">Help</button>
      </div>
      <div className="bookings-content">
        <h3>No bookings yet.</h3>
        <p>Looks like you haven’t experienced quality services at home.</p>
        <Link to="/services" className="explore-link">
          Explore our services &rarr;
        </Link>
      </div>
    </div>
  );
}

export default Clipboard;
