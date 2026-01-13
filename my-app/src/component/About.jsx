import React, { useEffect, useState } from "react";
import "./About.css";
import { Link } from "react-router-dom";

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/aboutData.json`)
      .then((res) => res.json())
      .then((data) => {
        setAboutData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching about data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

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
