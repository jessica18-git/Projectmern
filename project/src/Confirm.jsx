import { useState } from "react";

export default function ServicePackage() {
  const [packageCount, setPackageCount] = useState(1);
  const [paymentMode, setPaymentMode] = useState("Cash on Delivery");
  const [bookingStatus, setBookingStatus] = useState(null); // To track booking status
  const originalPrice = 999;
  const currentPrice = 848 * packageCount;

  const incrementCount = () => setPackageCount((prev) => prev + 1);
  const decrementCount = () => {
    if (packageCount > 1) setPackageCount((prev) => prev - 1);
  };

  const handleConfirmBooking = async () => {
    const productName = "Complete Honey Waxing"; // Product name
    const quantity = packageCount; // Quantity
    const price = currentPrice; // Price

    try {
      const response = await fetch('http://localhost:5000/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, quantity, price }),
      });

      if (response.ok) {
        setBookingStatus("Booking successful!");
      } else {
        setBookingStatus("Booking failed. Please try again.");
      }
    } catch (error) {
      setBookingStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div className="confirm-wrapper">
      <div className="confirm-card">
        <h3 className="confirm-title">Complete Honey Waxing</h3>
        <ul className="confirm-list">
          <li>Full arms + underarms (Honey) x{packageCount}</li>
          <li>Full legs (Honey) x{packageCount}</li>
          <li>Threading: Eyebrow x{packageCount}</li>
          <li>Threading: Upper lip x{packageCount}</li>
        </ul>
        <div className="confirm-edit">Edit Package</div>
        <div className="confirm-counter-price">
          <div className="confirm-counter">
            <button onClick={decrementCount} className="confirm-button">-</button>
            <span className="confirm-value">{packageCount}</span>
            <button onClick={incrementCount} className="confirm-buttonn">+</button>
          </div>
          <div className="confirm-price">
            ₹{currentPrice} <span className="confirm-original-price">₹{originalPrice * packageCount}</span>
          </div>
        </div>
        <div className="confirm-payment">
          <label className="confirm-label">Mode of Service</label>
          <select 
            value={paymentMode} 
            onChange={(e) => setPaymentMode(e.target.value)}
            className="confirm-select"
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
        <button className="confirm-booking-btn" onClick={handleConfirmBooking}>
          Confirm Booking
        </button>
        {bookingStatus && <div className="booking-status">{bookingStatus}</div>}
      </div>
    </div>
  );
}  
