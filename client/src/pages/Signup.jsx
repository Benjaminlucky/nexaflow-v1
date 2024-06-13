import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    emailAddress: "",
    phoneNumber: "",
    referredBy: "",
    bankName: "",
    bankAccountNumber: "",
    bankAccountName: "",
    password: "",
  });

  const bankOptions = [
    "Zenith Bank",
    "Access Bank",
    "GTBank",
    "First Bank",
    "UBA",
    "Fidelity Bank",
    "Union Bank",
    "Sterling Bank",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure referredBy is null if empty
    const formDataToSend = { ...formData };
    if (!formDataToSend.referredBy) {
      formDataToSend.referredBy = null;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/realtor/realtor", // Corrected URL
        formDataToSend
      );
      console.log(response.data);
      console.log("Sign Up Successful");
      navigate("/Signin");
    } catch (error) {
      console.log("Error during sign up", error);
    }
  };

  return (
    <main className="section__wrapper">
      <div className="left"></div>
      <div className="right">
        <div className="right__content">
          <div className="signup__top">
            <h2 className="signup__title">Create Account</h2>
            <p>Signup to join hundreds of real estate millionaires today!</p>
          </div>
          <div className="signup__bottom">
            <form onSubmit={handleSubmit}>
              <div className="name">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="lastName">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="username">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="email">
                <input
                  type="email"
                  name="emailAddress"
                  placeholder="Email Address"
                  value={formData.emailAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="phone">
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="referral">
                <input
                  type="text"
                  name="referredBy"
                  placeholder="Referral Username"
                  value={formData.referredBy}
                  onChange={handleChange}
                />
              </div>
              <div className="bank">
                <select
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                >
                  <option value="">Select a Bank</option>
                  {bankOptions.map((bank, index) => (
                    <option key={index} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bankNumber">
                <input
                  type="text"
                  name="bankAccountNumber"
                  placeholder="Bank Account Number"
                  value={formData.bankAccountNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="accountName">
                <input
                  type="text"
                  name="bankAccountName"
                  placeholder="Bank Account Name"
                  value={formData.bankAccountName}
                  onChange={handleChange}
                />
              </div>
              <div className="password">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="submit">
                <button type="submit" className="button">
                  Sign Up
                </button>
              </div>
            </form>
            <p className="signin">
              Already have an account?{" "}
              <Link to="/" className="sign">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
