import React from "react";
import { Link } from "react-router-dom";
import galleryData from "../data/galleryData.json";
import "./Gallery.css";

const Gallery = () => {
  // Split gallery into rows of 3
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const galleryRows = chunkArray(galleryData, 3);

  return (
    <>
      <section className="banner">
        <div className="banner-content">
          <h1>Gallery</h1>
          <p>
            <Link to="/">Home</Link> » Gallery
          </p>
        </div>
      </section>

      <section className="gallerysection">
        <div className="gallery wrapper">
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

          <div className="clear"></div>
        </div>
      </section>

    </>
  );
};

export default Gallery;
