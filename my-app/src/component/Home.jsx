import React from "react";
import { Link } from "react-router-dom";
import homedata from "../data/homedata.json";
import aboutData from "../data/aboutData.json";
import galleryData from "../data/galleryData.json";
import './Home.css';

const Home = () => {
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };
  const limitedGallery = galleryData.slice(0, 6);
  const galleryRows = chunkArray(limitedGallery, 3);

  return (
    <>
      <div className="home-content">
        <div className="banner-section">
          <h2>Welcome to Ajabu Fruits</h2>
          <p>Fresh and organic fruits delivered with love.</p>
        </div>
      </div>
    </>
  );
};

export default Home;
