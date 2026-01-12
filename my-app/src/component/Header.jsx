import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <header className="header ">
      {/* Top Contact Bar */}
      <div className="contact">
        <div className="content wrapper">
          <div className="socialicons">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://in.linkedin.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
          <div className="cont"> 
            <div className="number"> 
              <i className="fa fa-phone"></i> 
              <a href="tel:254-705-535021" className="gap"> 
                <span>254-705-535021</span> 
              </a> 
              <a href="tel:524-011447741" className="gap"> 
                <span>/ 524-011447741</span> 
                </a> 
            </div> 
            <a href="mailto:Info@AjabuFruits.com" className="gap"> 
              <i className="fa fa-envelope"></i> 
              <span>Info@AjabuFruits.com</span> 
              </a> 
          </div> 
      </div>
    </div>

      {/* Main Header */ }
  <div className="headermain wrapper">
    <div className="logo">
      <img
        src={`${import.meta.env.BASE_URL}images/logo.png`}
        alt="Ajabu Fruits Logo"
      />
    </div>

    <nav className={`menu ${menuOpen ? "active" : ""}`}>
      <ul className="menus">
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
        <li><Link to="/service" onClick={() => setMenuOpen(false)}>Services</Link></li>
        <li><Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>

        {!isLoggedIn ? (
          <li className="login-btn">
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          </li>
        ) : (
          <li>
            <button
              className="login-btn"
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                navigate("/login");
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>

    {/* Hamburger */}
    <div
      className={`menu-toggle ${menuOpen ? "open" : ""}`}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
    </header >
  );
};

export default Header;
