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
      alert('Please enter your full name.');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (!/^\d{10,15}$/.test(mobile)) {
      alert('Please enter a valid mobile number (10 to 15 digits).');
      return false;
    }

    if (!editingUser) {
      if (password.length < 6) {
        alert('Password should be at least 6 characters.');
        return false;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
       let url = 'https://zerosoft.in/reactsampletask/user-api/register.php'; 
      //let url = 'http://localhost/Sharumitha/react/user-api/register.php';
      let payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile
      };

      if (!editingUser) {
        payload.password = formData.password;
      } else {
        payload.id = editingUser.id;
        //url = 'http://localhost/Sharumitha/react/user-api/update_user.php';
        url = 'https://zerosoft.in/reactsampletask/user-api/update_user.php';
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert(editingUser ? 'User updated successfully!' : 'Registration successful!');
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
          navigate('/login'); 
        }
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      alert('Network error: ' + error.message);
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
              
              {/* Registration Title */}
              <h2 className="fw-bold mb-2">{editingUser ? 'Update Profile' : 'Register Now!'}</h2>
              <p className="text-muted mb-4">
                {editingUser ? 'Update your profile details' : 'Create your account to get started'}
              </p>

              <form onSubmit={handleSubmit} autoComplete="off">
                
                {/* Full Name Field */}
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

                {/* Email Field */}
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

                {/* Mobile Number Field */}
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

                {/* Password Field - Only show for new registration */}
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

                {/* Register/Update Button */}
                <button type="submit" className="btn login-button w-100 py-2 mb-3">
                  {editingUser ? 'Update Profile' : 'Register'}
                </button>
              </form>

              {/* Links Section */}
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