import React, { useState } from "react"; 
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const { name, phone, email, message } = formData;

    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!phone.trim()) {
      toast.error("Phone number is required");
      return false;
    } else if (!/^[0-9]{8,15}$/.test(phone)) {
      toast.error("Enter a valid phone number (8–15 digits)");
      return false;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    if (!message.trim()) {
      toast.error("Message is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(
        //"http://localhost/Sharumitha/react/user-api/contact.php",
         "https://zerosoft.in/reactsampletask/user-api/contact.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        toast.success("Message sent successfully!");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

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

              <input
                type="text"
                name="email"
                placeholder="Your Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Your Message"
                className="form-control"
                value={formData.message}
                onChange={handleChange}
              />

              <button type="submit">Send Message</button>
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
