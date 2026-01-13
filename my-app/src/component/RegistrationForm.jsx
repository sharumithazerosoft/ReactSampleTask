import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function RegistrationForm({ editingUser, setEditingUser, onUserUpdated }) {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

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
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { name, email, mobile, password, confirmPassword } = formData;

    if (!name.trim()) {
      toast.error("Please enter your full name.", { position: "top-right", autoClose: 3000 });
      return false;
    }

    if (!email.trim()) {
      toast.error("Please enter your email.", { position: "top-right", autoClose: 3000 });
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.", { position: "top-right", autoClose: 3000 });
      return false;
    }

    if (!/^\d{10,15}$/.test(mobile)) {
      toast.error("Please enter a valid mobile number (10 to 15 digits).", { position: "top-right", autoClose: 3000 });
      return false;
    }

    if (!editingUser) {
      if (password.length < 6) {
        toast.error("Password should be at least 6 characters.", { position: "top-right", autoClose: 3000 });
        return false;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.", { position: "top-right", autoClose: 3000 });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      let url = editingUser
        ? 'https://zerosoft.in/reactsampletask/user-api/update_user.php'
        : 'https://zerosoft.in/reactsampletask/user-api/register.php';

        //  let url = editingUser
        // ? 'http://localhost/Sharumitha/react/user-api/update_user.php'
        // : 'http://localhost/Sharumitha/react/user-api/register.php';

      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile
      };

      if (!editingUser) {
        payload.password = formData.password;
      } else {
        payload.id = editingUser.id;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === 'success') {
        toast.success(
          editingUser ? "User updated successfully!" : "Registration successful!",
          { position: "top-right", autoClose: 2000 }
        );

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
          setTimeout(() => navigate('/login'), 2000);
        }
      } else {
        toast.error("Error: " + result.message, { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Network error: " + error.message, { position: "top-right", autoClose: 3000 });
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container-fluid login-container">
      <ToastContainer /> {/* Toast container */}

      <div className="row align-items-center min-vh-100 login-box">
        <div className="col-12 col-lg-6 right-section">
          <div className="login-card bg-white rounded shadow-lg mx-auto">
            <div className="card-body p-4 p-md-5">

              <h2 className="fw-bold mb-2">{editingUser ? 'Update Profile' : 'Register Now!'}</h2>
              <p className="text-muted mb-4">
                {editingUser ? 'Update your profile details' : 'Create your account to get started'}
              </p>

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
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="text" // Use text to handle custom toast validation
                    name="email"
                    className="form-control form-input"
                    placeholder="email@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
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
                  className="text-primary fw-semibold small"
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
