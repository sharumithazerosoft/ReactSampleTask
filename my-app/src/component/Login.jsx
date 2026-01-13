import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation for required fields
    if (!email.trim() && !password.trim()) {
      toast.error("Please enter email and password", { position: "top-right", autoClose: 3000 });
      return;
    }
    if (!email.trim()) {
  toast.error("Please enter your email", { position: "top-right", autoClose: 3000 });
  return;
}
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  toast.error("Please enter a valid email address", { position: "top-right", autoClose: 3000 });
  return;
}

    if (!password.trim()) {
      toast.error("Please enter your password", { position: "top-right", autoClose: 3000 });
      return;
    }

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
        toast.success("Login successful!", { position: "top-right", autoClose: 2000 });
        localStorage.setItem("isLoggedIn", "true");

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error(`Login failed: ${result.message}`, { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error(`Network error: ${error.message}`, { position: "top-right", autoClose: 3000 });
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container-fluid login-container">
      <ToastContainer /> {/* Toast container */}

      <div className="row align-items-center min-vh-100 login-box">
        <div className="col-12 col-lg-6 right-section">
          <div className="login-card bg-white rounded shadow-lg mx-auto">
            <div className="card-body p-4 p-md-5">
              <h2 className="fw-bold mb-2">Login Now!</h2>
              <p className="text-muted mb-4">
                Welcome back! Please enter your details.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="text"
                    className="form-control form-input"
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control form-input"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  className="text-primary fw-semibold small"
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
