import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/services.json`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="banner">
        <div className="banner-content">
          <h1>Our Services</h1>
          <p>
            <Link to="/">Home</Link> » Services
          </p>
        </div>
      </section>

      <section className="services service-text">
        {loading && <p className="loading">Loading services...</p>}

        {!loading && services.length === 0 && (
          <p className="no-record">No services found.</p>
        )}

        {services.map((service) => (
          <div className="service-detail" key={service.id}>
            <div className="service-container wrapper">
              <div className="service-text">
                <h2>{service.service}</h2>
                <p>{service.description}</p>
              </div>

              {service.image && (
                <div className="service-image">
                  <img
                    src={`${import.meta.env.BASE_URL}${service.image}`}
                    alt={service.service}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Services;
