import React from "react";
import { Link } from "react-router-dom";
import services from "../data/services.json";
import "./Services.css";

const Services = () => {
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
        {services.length === 0 && <p className="no-record">No services found.</p>}

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
