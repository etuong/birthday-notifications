import React, { useState } from "react";
import { registerUser } from "../services/Firebase";

const Authentication = () => {
  const [authMode, setAuthMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
    setName("");
    setEmail("");
    setPassword("");
    setPasswordAgain("");
    setErrorMessage("");
  };

  const handleRegistration = (event) => {
    event.preventDefault();

    // Validation
    const validation = [];
    if (!name) {
      validation("* Name cannot be blank");
    }
    if (!email) {
      validation("* Email cannot be blank");
    }
    if (!password || !passwordAgain) {
      validation("* Password(s) cannot be blank");
    } else if (password !== passwordAgain) {
      validation("* Passwords are not the same");
    }
    setErrorMessage(validation.join("\n`"));

    registerUser(name, email, password);
  };

  if (authMode === "signin") {
    return (
      <div className="auth-form-container">
        <form className="auth-form">
          <div className="auth-form-content">
            <h3 className="auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Register
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={(e) => handleRegistration(e)}>
        <div className="auth-form-content">
          <h3 className="auth-form-title">Register</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Please Enter Password Again</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Authentication;
