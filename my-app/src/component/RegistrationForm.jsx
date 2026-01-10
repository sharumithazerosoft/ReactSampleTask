import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegistrationForm.css';

function RegistrationForm({ editingUser, setEditingUser, onUserUpdated }) {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState("");       // <-- New state for message
  const [messageType, setMessageType] = useState(""); // success or error

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        mobile: editingUser.mobile,
        password: '',
        confirmPassword: ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
      });
    }
    setMessage(""); // Clear message when editingUser changes
    setMessageType("");
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { name, email, mobile, password, confirmPassword } = formData;

    if (!name.trim()) {
      setMessage("Please enter your full name.");
      setMessageType("error");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return false;
    }

    if (!/^\d{10,15}$/.test(mobile)) {
      setMessage("Please enter a valid mobile number (10 to 15 digits).");
      setMessageType("error");
      return false;
    }

    if (!editingUser) {
      if (password.length < 6) {
        setMessage("Password should be at least 6 characters.");
        setMessageType("error");
        return false;
      }
      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        setMessageType("error");
        return false;
      }
    }

    setMessage(""); 
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // let url = 'http://localhost/Sharumitha/react/user-api/register.php';
     let url='https://zerosoft.in/reactsampletask/user-api/update_user.php';
      let payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile
      };

      if (!editingUser) {
        payload.password = formData.password;
      } else {
        payload.id = editingUser.id;
       // url = 'http://localhost/Sharumitha/react/user-api/update_user.php';
         url='https://zerosoft.in/reactsampletask/user-api/update_user.php';
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === 'success') {
        setMessage(editingUser ? "User updated successfully!" : "Registration successful!");
        setMessageType("success");

        setFormData({
          name: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: ''
        });

        if (editingUser) setEditingUser(null);
        if (onUserUpdated) onUserUpdated();

        if (!editingUser) {
          // Redirect after short delay to show success message
          setTimeout(() => navigate('/login'), 1000);
        }
      } else {
        setMessage("Error: " + result.message);
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
      setMessageType("error");
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container-fluid login-container">
      <div className="row align-items-center min-vh-100 login-box">
        <div className="col-12 col-lg-6 right-section">
          <div className="login-card bg-white rounded shadow-lg mx-auto">
            <div className="card-body p-4 p-md-5">
              
              <h2 className="fw-bold mb-2">{editingUser ? 'Update Profile' : 'Register Now!'}</h2>
              <p className="text-muted mb-4">
                {editingUser ? 'Update your profile details' : 'Create your account to get started'}
              </p>

              {/* Display message on page */}
              {message && (
                <div
                  className={`mb-3 p-2 rounded ${
                    messageType === "success" ? "success" : "failed"
                  }`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-input"
                    placeholder="email@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-control form-input"
                    placeholder="Digits only, e.g. 9876543210"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>

                {!editingUser && (
                  <>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control form-input"
                        placeholder="Enter password (at least 6 characters)"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control form-input"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </>
                )}

                <button type="submit" className="btn login-button w-100 py-2 mb-3">
                  {editingUser ? 'Update Profile' : 'Register'}
                </button>
              </form>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <a href="#" className="text-decoration-none text-muted small">
                  {editingUser ? 'Back to dashboard' : 'Already have an account?'}
                </a>
                <span 
                  className="text-primary text-decoration-none fw-semibold small"
                  style={{ cursor: "pointer" }}
                  onClick={goToLogin}
                >
                  {editingUser ? 'Cancel' : 'Login'}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
