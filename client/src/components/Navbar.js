import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Cinematographer Logo" className="logo" />
          </Link>
        </div>
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/portfolio" className="nav-link">Portfolio</Link>
          <Link to="/stories" className="nav-link">Stories</Link>
        </div>
        <div className="nav-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
