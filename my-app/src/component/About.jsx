import React from "react";
import aboutData from "../data/aboutData.json";
import "./About.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <section className="about">
      <section className="banner">
        <div className="banner-content">
        <h1>About Us</h1>
        <p>
          <Link to="/home">Home</Link> » About Us
        </p>
        </div>
      </section>
      <div className="about-container wrapper">
      <div className="about-text">
        <h2 className="section-title">{aboutData.title}</h2>
        <p>{aboutData.description}</p>
      </div>
      <div className="about-image">
        <img
        src={`${import.meta.env.BASE_URL}${aboutData.image}`}
        alt="About us"
        />
      </div>
      </div>
    </section>
  );
}

export default About;
