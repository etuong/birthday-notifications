import React, { useState } from "react";
import { registerUser, login } from "../services/Firebase";
import useInput from "../hooks/useInput";

const Authentication = () => {
  const [authMode, setAuthMode] = useState("signin");
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const passwordAgain = useInput("");
  const [errorMessages, setErrorMessages] = useState([]);

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleRegistration = (event) => {
    event.preventDefault();

    // Validation
    const validation = [];
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!name.value) {
      validation.push("Name cannot be blank");
    }
    if (!email.value) {
      validation.push("Email cannot be blank");
    } else if (!email.value.match(validRegex)) {
      validation.push("Please enter a valid email address");
    }
    if (!password.value || !passwordAgain.value) {
      validation.push("Password(s) cannot be blank");
    } else if (password.value.length < 6 && passwordAgain.value.length < 6) {
      validation.push("Password(s) should be at least 6 characters");
    } else if (password.value !== passwordAgain.value) {
      validation.push("Passwords are not the same");
    }
    setErrorMessages(validation);

    if (validation.length === 0) {
      registerUser(name.value, email.value, password.value);
    }
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    login(email.value, password.value);
  };

  if (authMode === "signin") {
    return (
      <div className="auth-form-container" onSubmit={(e) => handleSignIn(e)}>
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
                {...email}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                {...password}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-success">
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
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              {...name}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              {...email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              {...password}
            />
          </div>
          <div className="form-group mt-3">
            <label>Please Enter Password Again</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              {...passwordAgain}
            />
          </div>
          {errorMessages && (
            <ul>
              {errorMessages.map((errorMessage, index) => (
                <li key={index} className="error">
                  {errorMessage}
                </li>
              ))}
            </ul>
          )}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-success">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Authentication;
