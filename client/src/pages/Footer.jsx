import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About EcoRewards</h4>
          <p>
            EcoRewards is a platform that encourages and rewards eco-friendly practices to make the world a better place.
          </p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: contact@ecorewards.com</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>Stay connected on social media:</p>
          <ul className="social-links">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
