import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './App.css';

import loca from './locaview.webp';
import time from './timeview.webp';
import pay from './payview.webp';
import meh from './mehview.webp';
import sara from './saraview.webp';

function App() {
  const [packageCount, setPackageCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const currentPrice = 848 * packageCount;
  const originalPrice = 1038 * packageCount;

  const incrementCount = () => setPackageCount(packageCount + 1);
  const decrementCount = () => {
    if (packageCount > 1) {
      setPackageCount(packageCount - 1);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  const handleSlotSelection = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
    closeModal();
  };

  // When clicking "Proceed", check if the user is logged in.
  const handleProceed = () => {
    if (!isLoggedIn) {
      alert("Please log in to proceed");
    } else {
      // Redirect to Confirm.jsx page
      navigate('/confirm'); // Use navigate to redirect
    }
  };

  return (
    <div className="app-container">
      <div className="booking-container">
        <div className="booking-item">
          <div className="details">
            <span>
              <img src={loca} alt="Location Icon" className="icon-image" />
              Send booking details to
              <button className="auth-button" onClick={openLoginModal}>Log In</button>
            </span>
          </div>
        </div>

        <div className="booking-item">
          <div className="details">
            <span>
              <img src={loca} alt="Location Icon" className="icon-image" />
              Address
            </span>
            <button className="select-button">Select an address</button>
          </div>
        </div>

        <div className="booking-item">
          <div className="details">
            <span>
              <img src={time} alt="Time Icon" className="icon-image" />
              Slot
            </span>
            <button className="slot-button" onClick={openModal}>
              {selectedDate && selectedTime ? `${selectedDate} - ${selectedTime}` : 'Select time and date'}
            </button>
          </div>
        </div>

        <div className="booking-item disabled">
          <img src={pay} alt="Payment Icon" className="icon-image" />
          <div className="details">
            <span>Payment Method</span>
          </div>
        </div>

        <div className="cancellation-policy">
          <h3>Cancellation policy</h3>
          <p>
            Free cancellations if done more than 12 hrs before the service or if a professional isn’t assigned.
            A fee will be charged otherwise.
          </p>
        </div>
      </div>

      <div className="service-package">
        <div className="package-details">
          <h3>Complete honey waxing</h3>
          <ul>
            <li>Full arms + underarms (Honey) x{packageCount}</li>
            <li>Full legs (Honey) x{packageCount}</li>
            <li>Threading: Eyebrow x{packageCount}</li>
            <li>Threading: Upper lip x{packageCount}</li>
          </ul>
          <div className="edit-package">Edit package</div>
          <div className="price-quantity">
          <button onClick={decrementCount} className="incri-buttonn">-</button>
            <span>{packageCount}</span>
            <button onClick={incrementCount} className="incri-buttonn">+</button>
            <div className="price">₹{currentPrice} <span className="original-price">₹{originalPrice}</span></div>
          </div>
        </div>

        <div className="frequently-added">
          <h4>Frequently added together</h4>
          <div className="additional-items">
            <div className="item">
              <img src={meh} alt="Hair colour" />
              <p>Hair colour/mehendi (only application) ₹249</p>
              <button>Add</button>
            </div>
            <div className="item">
              <img src={sara} alt="Sara fruit clean" />
              <p>Sara fruit clean (only application) ₹649</p>
              <button>Add</button>
            </div>
          </div>
        </div>

        <div className="amount-to-pay">
          <h4>Amount to pay</h4>
          <div className="total-price">
            <span>₹{currentPrice}</span>
          </div>
          <button className="proceed-button" onClick={handleProceed}>Proceed</button>
        </div>
      </div>

      {isModalOpen && <SlotModal onSelectSlot={handleSlotSelection} onClose={closeModal} />}
      {isLoginModalOpen && (
        <LoginPopup 
          onClose={closeLoginModal} 
          onSignup={openSignupModal} 
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            closeLoginModal();
          }}
        />
      )}
      {isSignupModalOpen && <SignupPopup onClose={closeSignupModal} />}
    </div>
  );
}

function SlotModal({ onSelectSlot, onClose }) {
  const dates = ['Fri 31', 'Sat 01', 'Sun 02'];
  const times = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM'];

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select Date and Time</h2>
        <div className="date-selection">
          {dates.map(date => (
            <button
              key={date}
              className={selectedDate === date ? 'selected' : ''}
              onClick={() => setSelectedDate(date)}
            >
              {date}
            </button>
          ))}
        </div>
        <div className="time-selection">
          {times.map(time => (
            <button
              key={time}
              className={selectedTime === time ? 'selected' : ''}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
        <button
          className="confirm-button"
          onClick={() => onSelectSlot(selectedDate, selectedTime)}
          disabled={!selectedTime}
        >
          Confirm
        </button>
        <button className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function LoginPopup({ onClose, onSignup, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: email, // Assuming email is used as the username
        password: password,
      });

      if (response.status === 200) {
        alert("Login successful");
        onLoginSuccess(); // Update the login state in the parent component
      }
    } catch (error) {
      alert("Invalid username or password");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Log in to your account</h2>
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>Log In</button>
        <p className="signup-text">
          Don't have an account? <span className="signup-link" onClick={onSignup}>Sign Up/Register</span>
        </p>
      </div>
    </div>
  );
}

function SignupPopup({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !mobile || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        name: name, 
        email: email,
        mobile: mobile,  
        password: password,
        confirmPassword: confirmPassword, 
      });

      if (response.status === 201) {
        alert("Registration successful. Please log in.");
        onClose(); // Close the signup modal
      }
    } catch (error) {
      alert("Registration failed: " + error.response?.data || error.message);
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Create an Account</h2>
        <input
          type="text"
          placeholder="Name"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Mobile Number"
          className="input-field"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="signup-button" onClick={handleSignup}>Register</button>
      </div>
    </div>
  );
}

export default App;