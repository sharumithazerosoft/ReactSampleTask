import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="contact">
        <div className="wrapper content">
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
      <div className="headermain wrapper">
        <div className="logo">
      <img
  src={`${import.meta.env.BASE_URL}images/logo.png`}
  alt="Ajabu Fruits Logo"
/>

        </div>

        <div className="menu">
          <ul className="menus nav-links" id="navLinks">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>

            <li className="dropdown">
              <Link to="/service" className="dropbtn">
                Services
              </Link>
            </li>

            <li>
              <Link to="/gallery">Gallery</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>

            <li className="login-btn">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>

        <div id="menu-ctn">
          <div className="menu-bars"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
