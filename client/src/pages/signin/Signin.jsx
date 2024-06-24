import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signin.css";
import axios from "axios";

function Signin() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/realtor/signin",
        formData
      );

      if (response.data.token) {
        // Store the token in local storage or context
        localStorage.setItem("token", response.data.token);
        // Navigate to the dashboard or any other protected route
        setSuccessMessage("Signin successful! Redirecting to dashboard...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setErrorMessage("Login failed. No token received.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <main className="section">
      <div className="signin__left"></div>
      <div className="right">
        <div className="right__content">
          <div className="top__content">
            <h2 className="signin__title">Sign In</h2>
            <p>Login to access your account!</p>
          </div>
          <div className="bottom__content">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Email address"
                name="emailAddress"
                onChange={handleChange}
                value={formData.emailAddress}
              />
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
              <button className="login__btn" type="submit">
                Sign In
              </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            <p className="signupLink">
              Don't have an account?{" "}
              <Link to="/" className="sign">
                Sign Up
              </Link>
            </p>
            <p className="copy">&copy; 2024 Nexaflow Inc.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signin;
