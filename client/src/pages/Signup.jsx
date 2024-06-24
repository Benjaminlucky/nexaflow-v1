import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Select, Spinner, TextInput } from "flowbite-react";
import "flowbite/dist/flowbite.css";

function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    resetForm();

    const phoneNumber = formData.phoneNumber.trim();

    if (!phoneNumberRegex.test(phoneNumber)) {
      setErrorMessage(
        "Invalid phone number. Please enter a valid 11-digit phone number starting with 080, 070, 090, 081, or 091."
      );
      setLoading(false);
      return;
    }

    const bankAccountNumber = formData.bankAccountNumber;

    if (!bankAccountNumberRegex.test(bankAccountNumber)) {
      setErrorMessage(
        "Invalid bank account number. Please enter a valid 10-digit bank account number."
      );
      setLoading(false);
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
      setSuccessMessage("Signup successful! Redirecting to sign in...");
      setLoading(false);
      setTimeout(() => {
        navigate("/signin");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
        setLoading(false);
        return;
      }
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
                <TextInput
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full border border-gray-500 rounded-lg p-2"
                />
              </div>
              <div className="lastName">
                <TextInput
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full border border-gray-500 rounded-lg p-2"
                />
              </div>
              <div className="username">
                <TextInput
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full  border border-gray-500 rounded-lg p-2"
                />
              </div>
              <div className="email">
                <TextInput
                  type="email"
                  name="emailAddress"
                  placeholder="Email Address"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="block w-full border border-gray-500 rounded-lg p-2"
                />
              </div>
              <div className="phone">
                <TextInput
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  pattern="[0-9]*"
                  className="block w-full border border-gray-500 rounded-lg p-2"
                />
              </div>
              <div className="referral">
                <TextInput
                  type="text"
                  name="referredBy"
                  placeholder="Referral Username"
                  value={formData.referredBy}
                  onChange={handleChange}
                  className="block w-full border border-gray-500 rounded-lg p-2"
                />
              </div>
              <div className="bank">
                <Select
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="block w-full  border border-gray-500 rounded-lg p-2"
                >
                  <option value="">Select a Bank</option>
                  {bankOptions.map((bank, index) => (
                    <option key={index} value={bank}>
                      {bank}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="bankNumber">
                <TextInput
                  type="text"
                  name="bankAccountNumber"
                  placeholder="Bank Account Number"
                  value={formData.bankAccountNumber}
                  onChange={handleChange}
                  className="block w-full border border-gray-500 rounded-lg p-2"
                />
              </div>
              <div className="accountName">
                <TextInput
                  type="text"
                  name="bankAccountName"
                  placeholder="Bank Account Name"
                  value={formData.bankAccountName}
                  onChange={handleChange}
                  className="block w-full border border-gray-500 rounded-lg p-2"
                />
              </div>
              <div className="password">
                <TextInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full border border-gray-500 rounded-lg p-2"
                />
              </div>
              <div className="submit">
                <Button
                  type="submit"
                  color="dark"
                  className="button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner /> <p>Loading...</p>
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
            {errorMessage && (
              <Alert color="failure" className="p-4">
                {errorMessage}
              </Alert>
            )}
            {successMessage && (
              <Alert color="success" className="p-4">
                {successMessage}
              </Alert>
            )}
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
