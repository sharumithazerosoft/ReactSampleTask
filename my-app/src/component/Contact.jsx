import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const validate = () => {
    let newErrors = {};

    if (!/^[0-9]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number (8–15 digits)";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setStatusType("");
    if (!validate()) return;

    try {
      const response = await fetch(
       // "http://localhost/Sharumitha/react/user-api/contact.php",
        "https://zerosoft.in/reactsampletask/user-api/contact.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        setStatusType("success");
        setStatusMessage("Message sent successfully!");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setErrors({});
      } else {
        setStatusType("error");
        setStatusMessage(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      setStatusType("error");
      setStatusMessage("Server error. Please try again later.");
    }
  };

  return (
    <>
      <section className="banner">
        <div className="banner-content">
          <h1>Contact Us</h1>
          <p>
            <Link to="/home">Home</Link> » Contact Us
          </p>
        </div>
      </section>

      <section className="contact-section wrapper">
        <div className="contact-container">

         
          <div className="contact-form">
            <h2>Send Us a Message</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="error-text">{errors.phone}</span>
              )}

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}

              <textarea
                name="message"
                placeholder="Your Message"
                required
                className="form-control"
                value={formData.message}
                onChange={handleChange}
              />

              <button type="submit">Send Message</button>

              {statusMessage && (
                <p className={`form-message ${statusType}`}>
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
 <div className="contact-map">
            <iframe
              src="https://www.google.com/maps?q=12/A,+Romania+City+New+World+Journey,+UK&output=embed"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen
              loading="lazy"
              title="Google Map"
            />
          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;
