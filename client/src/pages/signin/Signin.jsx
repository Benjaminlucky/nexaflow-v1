import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signin.css";
import "../../index.css";
import axios from "axios";
import "flowbite/dist/flowbite.css";
import { Alert, Button, TextInput } from "flowbite-react";
import { Spinner } from "flowbite-react";

function Signin() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetForm();

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
        return;
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    // setFormData({
    //   emailAddress: "",
    //   password: "",
    // });
    setErrorMessage(null);
    setSuccessMessage(null);
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
              <TextInput
                type="text"
                placeholder="Enter Email address"
                name="emailAddress"
                onChange={handleChange}
                value={formData.emailAddress}
                className="block w-full mt-4"
              />
              <TextInput
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="block w-full mt-4 "
              />
              <Button
                type="submit"
                color="dark"
                className="mt-4 w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    {" "}
                    <Spinner /> <p> Loading...</p>{" "}
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            {errorMessage && (
              <Alert color="failure" className="p-4 mt-2 mb-2">
                {errorMessage}
              </Alert>
            )}
            {successMessage && (
              <Alert color="success" className="p-4">
                {successMessage}
              </Alert>
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
