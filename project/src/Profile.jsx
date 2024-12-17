import React, { useState } from "react";

function ProfileDropdown() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [showModal, setShowModal] = useState(false);   // Modal state

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowModal(false); // Close the modal after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {/* Dropdown Menu */}
      <div className="dropdown">
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

      {/* Login Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✖
            </button>
            <h2>Login/Sign up</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="input-container">
                <select className="country-code">
                  <option value="+91">+91</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  maxLength="10"
                  required
                />
              </div>
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
