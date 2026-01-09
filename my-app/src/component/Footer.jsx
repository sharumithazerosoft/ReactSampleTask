import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
  <>
     <section className="socialmedia" id="footer">
        <div className="wrapper scontent">
          <div className="scont">
            <span>
              <i className="fa fa-envelope"></i>
            </span>
            <a href="mailto:Info@AjabuFruits.com">Info@AjabuFruits.com</a>
          </div>

          <div className="scont">
            <span>
              <i className="fa fa-phone"></i>
            </span>
            <div className="number">
              <a href="tel:254-705-535021" className="gap">
                254-705-535021
              </a>
              <a href="tel:524-011447741" className="gap">
                / 524-011447741
              </a>
            </div>
          </div>

          <div className="scont">
            <span>
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <p>12/A, Romania City New World Journey, UK</p>
          </div>
        </div>
      </section>

      <section className="footer">
        <div className="copyright">
          {/* <a href="#home" className="top">
            <img
              src={`${import.meta.env.BASE_URL}images/toparrow.png`}
              alt="Top Arrow"
            />
          </a> */}

          <p>
            <strong>
              Copyright ©{" "}
              <strong>
                <a href="http://zerosoft.in/reactsampletask/">
                  Ajabu Fruits
                </a>
              </strong>
              .
            </strong>{" "}
            All rights reserved.
          </p>
        </div>
      </section>
</>
  );
};
export default Footer;
