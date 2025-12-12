import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Adithkrishna</h3>
          <p>Crafting visual stories through the lens</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: iadithkrishna@gmail.com</p>
          <p>Phone: +91 9446938082</p>
        </div>
        <div className="footer-section">
          <h3>Follow Me</h3>
          <div className="social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Adith Krishna Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
