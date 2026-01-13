import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState(""); // <-- new state for messages
  const [messageType, setMessageType] = useState(""); // success or error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
         "https://zerosoft.in/reactsampletask/user-api/login.php",
        //"http://localhost/Sharumitha/react/user-api/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const result = await response.json();
      if (result.status === "success") {
        setMessage("Login successful!");
        setMessageType("success");
        localStorage.setItem("isLoggedIn", "true");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage("Login failed: " + result.message);
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
      setMessageType("error");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container-fluid login-container">
      <div className="row align-items-center min-vh-100 login-box">
        <div className="col-12 col-lg-6 right-section">
          <div className="login-card bg-white rounded shadow-lg mx-auto">
            <div className="card-body p-4 p-md-5">
              <h2 className="fw-bold mb-2">Login Now!</h2>
              <p className="text-muted mb-4">Welcome back! Please enter your details.</p>

              {/* Display message on page */}
              {message && (
                <div
                  className={`mb-3 p-2 rounded ${
                    messageType === "success" ? "success text-green" : "failed text-red"
                  }`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control form-input"
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control form-input"
                    placeholder="username"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn login-button w-100 py-2 mb-3">
                  Login 
                </button>
              </form>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <a href="#" className="text-decoration-none text-muted small">
                  Forgot your username?
                </a>
                <span
                  className="text-primary text-decoration-none fw-semibold small"
                  style={{ cursor: "pointer" }}
                  onClick={goToRegister}
                >
                  Sign Up
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
