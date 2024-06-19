import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

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

  const phoneNumberRegex = /^(080|070|090|081|091)[0-9]{8}$/;
  const bankAccountNumberRegex = /^[0-9]{10}$/;

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "bankAccountNumber") {
      value = value.replace(/[^0-9]/g, ""); // only allow numbers
      if (value.length > 10) {
        value = value.substring(0, 10); // limit to 10 digits
      }
    } else if (e.target.name !== "bankAccountName") {
      value = value.trim(); // trim spaces for all fields except bankAccountName
    }
    if (e.target.name === "phoneNumber") {
      value = value.replace(/[^0-9]/g, ""); // only allow numbers
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneNumber = formData.phoneNumber.trim();

    if (!phoneNumberRegex.test(phoneNumber)) {
      setErrorMessage(
        "Invalid phone number. Please enter a valid 11-digit phone number starting with 080, 070, 090, 081, or 091."
      );
      return;
    }

    const bankAccountNumber = formData.bankAccountNumber;

    if (!bankAccountNumberRegex.test(bankAccountNumber)) {
      setErrorMessage(
        "Invalid bank account number. Please enter a valid 10-digit bank account number."
      );
      return;
    }

    // Ensure referredBy is null if empty
    const formDataToSend = { ...formData };
    if (!formDataToSend.referredBy) {
      formDataToSend.referredBy = null;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/realtor/signup", // Corrected URL
        formDataToSend
      );
      console.log(response.data);
      console.log("Sign Up Successful");
      navigate("/Signin");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
      }
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
                  pattern="[0-9]*"
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p className="signin">
              Already have an account?{" "}
              <Link to="/signin" className="sign">
                Sign In
              </Link>
            </p>
            <p className="copy">&copy; 2024 Nexaflow Inc.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
