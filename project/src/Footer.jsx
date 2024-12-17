import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";


const Footer = () => {
  return (
    <Router>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about-us">About us</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">Terms & conditions</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy policy</Link>
              </li>
              <li>
                <Link to="/anti-discrimination-policy">Anti-discrimination policy</Link>
              </li>
              <li>
                <Link to="/uc-impact">UC impact</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>For customers</h4>
            <ul>
              <li>
                <Link to="/uc-reviews">UC reviews</Link>
              </li>
              <li>
                <Link to="/categories-near-you">Categories near you</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>For partners</h4>
            <ul>
              <li>
                <Link to="/register-as-professional">Register as a professional</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Social links</h4>
            <div className="social-icons">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/twitter.png" alt="Twitter" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.png" alt="Facebook" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.png" alt="Instagram" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/linkedin.png" alt="LinkedIn" />
              </a>
            </div>
            <div className="store-links">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/appstore.png" alt="App Store" />
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/playstore.png" alt="Google Play" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© Copyright 2024 Urban Company. All rights reserved. | CIN: U74140DL2014PTC274413</p>
        </div>
      </footer>
    </Router>
  );
};

export default Footer;
