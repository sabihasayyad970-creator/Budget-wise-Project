import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // Handle login
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      // Success login
      if (response.ok && data.token) {

        const user = {
          id: data.id,
          name: data.name,
          email: data.email,
          token: data.token
        };

        // Save user in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        setMessage("Login successful!");

        // Redirect to dashboard
        navigate("/dashboard");

      } else {

        setMessage("Invalid email or password");

      }

    } catch (error) {

      console.error("Login error:", error);
      setMessage("Server error. Please try again.");

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>Welcome Back</h2>
        <p>Login to continue</p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="auth-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>

        {message && (
          <p className="auth-message">{message}</p>
        )}

        <div className="auth-link">
          Don't have account? <Link to="/signup">Sign Up</Link>
        </div>

      </div>

    </div>

  );

}

export default Login;