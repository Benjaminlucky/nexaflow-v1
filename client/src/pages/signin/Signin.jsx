import React from "react";
import { Link } from "react-router-dom";
import "./signin.css";

function Signin() {
  return (
    <main className="section">
      <div className="signin__left"></div>
      <div className="right">
        <div className="right__content">
          <div className="top__content">
            <h2 className="signin__title">Create Account</h2>
            <p>Signup to join hundreds of real estate millionaires today!</p>
          </div>
          <div className="bottom__content">
            <form>
              <input
                type="text"
                placeholder="Enter Email or Username"
                name="loginId"
              />
              <input
                type="password"
                placeholder="Enter Password"
                name="loginPassword"
              />
              <button className="login__btn">Sign In</button>
            </form>
            <p className="signupLink">
              Don't have an account Already ?{" "}
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
