import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Cinematographer Portfolio</h3>
          <p>Crafting visual stories through the lens</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@cinematographer.com</p>
          <p>Phone: +1 (555) 123-4567</p>
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
        <p>&copy; 2023 Cinematographer Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
