import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  Promise.all([
    fetch(`${import.meta.env.BASE_URL}data/homedata.json`).then(res => res.json()),
    fetch(`${import.meta.env.BASE_URL}data/aboutData.json`).then(res => res.json()),
    fetch(`${import.meta.env.BASE_URL}data/gallerydata.json`).then(res => res.json())
  ])
    .then(([homeRes, aboutRes, galleryRes]) => {
      setHomeData(homeRes);
      setAboutData(aboutRes);
      setGalleryData(galleryRes);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error loading home data:", error);
      setLoading(false);
    });
}, []);

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  if (loading || !homeData || !aboutData) {
    return <p className="loading">Loading...</p>;
  }

  const limitedGallery = galleryData.slice(0, 6);
  const galleryRows = chunkArray(limitedGallery, 3);

  return (
    <div className="home-content">

      {/* Banner */}
      <section className="banner-section">
        <div className="wrapper home-banner">
          <h2>Welcome to Ajabu Fruits</h2>
          <p>Fresh and organic fruits delivered with love.</p>
        </div>
      </section>

      {/* About */}
      <section className="About-section about-container wrapper">
        <div className="about-image">
         <img
            src={`${import.meta.env.BASE_URL}${aboutData.image}`}
            alt="About us"
          />
        </div>
        <div className="about-text">
          <h2 className="section-title">{aboutData.title}</h2>
          <p>
            {aboutData.description.length > 450
              ? aboutData.description.slice(0, 450) + "..."
              : aboutData.description}
            <Link className="read-more" to="/about"> Read More</Link>
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="service">
        <div className="color">
          <div className="wrapper service-content">
            <h1>Services</h1>
            <p>{homeData.description}</p>
            <Link className="more" to="/service">Read More</Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallerysection">
        <div className="gallery wrapper">
          <h2 className="section-title">Gallery</h2>
          {galleryRows.map((row, rowIndex) => (
            <div className="rows" key={rowIndex}>
              {row.map((gallery, index) => (
                <a
                  key={gallery.a_id}
                  href={`${import.meta.env.BASE_URL}${gallery.a_image}`}
                  className={rowIndex === 0 && index === 0 ? "big" : ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${gallery.a_image}`}
                    alt={`Gallery ${gallery.a_id}`}
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
