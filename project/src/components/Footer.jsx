import React from "react";
import { Link } from "react-router-dom";
import footericon from '../footericon.webp'
const Footer = () => {
  return (
    <footer className="footer">
        <img src={footericon} alt="Urban Company Logo" className="footerlogo" />
      <div className="footer-container">
        
        {/* Company Section */}
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/terms">Terms & conditions</Link></li>
            <li><Link to="/privacy">Privacy policy</Link></li>
            <li><Link to="/anti-discrimination">Anti-discrimination policy</Link></li>
            <li><Link to="/uc-impact">UC impact</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>

        {/* For Customers Section */}
        <div className="footer-section">
          <h3>For customers</h3>
          <ul>
            <li><Link to="/reviews">UC reviews</Link></li>
            <li><Link to="/categories">Categories near you</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
          </ul>
        </div>

        {/* For Partners Section */}
        <div className="footer-section">
          <h3>For partners</h3>
          <ul>
            <li><Link to="/register">Register as a professional</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-section social-links">
          <h3>Social links</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
          <div className="app-links">
            <a href="#">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" />
            </a>
            <a href="#">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1024px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; Copyright 2024 Urban Company. All rights reserved. | CIN: U74140DL2014PTC274413</p>
      </div>
    </footer>
  );
};

export default Footer;
