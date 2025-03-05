import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

function ProfileDropdown() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [showModal, setShowModal] = useState(false);   // Modal state
  const [mobileNumber, setMobileNumber] = useState(""); // Mobile number state
  const [error, setError] = useState(""); // Error state

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowModal(false); // Close the modal after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const validateMobileNumber = (number) => {
    const regex = /^\d{10}$/; // Exactly 10 digits
    return regex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateMobileNumber(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    handleLogin();
  };

  return (
    <div>
      {/* Dropdown Menu */}
      <div className="dropdown">
      <div className="smallbox">
        {!isLoggedIn ? (
          <span className="dropdown-item" onClick={() => setShowModal(true)}>
            Login
        </span>
        ) : (
          <span className="dropdown-item" onClick={handleLogout}>
            Logout
          </span>
        )}
      </div>
</div>
      {/* Login Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              <FaArrowRight />
            </button>
            <h2>Login/Sign up</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <select className="country-code">
                  <option value="+91">+91</option>
                  
                </select>
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  maxLength="10"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="proceed-btn">
                Proceed
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
