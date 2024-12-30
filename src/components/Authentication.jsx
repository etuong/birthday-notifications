import React, { useState } from "react";
import { registerUser, login, resetPassword } from "../services/Firebase";
import useInput from "../hooks/useInput";

const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Authentication = ({ openToast }) => {
  const [authMode, setAuthMode] = useState("signin");
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const passwordAgain = useInput("");
  const [errorMessages, setErrorMessages] = useState([]);

  const changeAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === "signin" ? "signup" : "signin"));
    setErrorMessages([]);
  };

  const handleSubmit = async (event, mode) => {
    event.preventDefault();
    const validation = [];
    if (!email.value.match(validRegex)) {
      validation.push("Please enter a valid email address");
    }
    if (mode === "signup") {
      if (password.value.length < 6 || passwordAgain.value.length < 6) {
        validation.push("Password(s) should be at least 6 characters");
      }
      if (password.value !== passwordAgain.value) {
        validation.push("Passwords are not the same");
      }
    }
    setErrorMessages(validation);
    if (validation.length === 0) {
      const result = mode === "signin"
        ? await login(email.value, password.value)
        : await registerUser(name.value, email.value, password.value);
      openToast(result);
    }
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    if (!email.value.match(validRegex)) {
      setErrorMessages(["To reset password, please enter a valid email address"]);
    } else {
      const result = await resetPassword(email.value);
      openToast(result);
    }
  };

  const renderForm = (mode) => (
    <form className="auth-form" onSubmit={(e) => handleSubmit(e, mode)}>
      <div className="auth-form-content">
        <h3 className="auth-form-title">{mode === "signin" ? "Sign In" : "Register"}</h3>
        <div className="text-center">
          {mode === "signin" ? "Not registered yet? " : "Already registered? "}
          <span className="link-primary" onClick={changeAuthMode}>
            {mode === "signin" ? "Register" : "Sign In"}
          </span>
        </div>
        {mode === "signup" && (
          <div className="form-group mt-3">
            <label>Name</label>
            <input type="text" required className="form-control mt-1" placeholder="e.g Jane Doe" {...name} />
          </div>
        )}
        <div className="form-group mt-3">
          <label>Email address</label>
          <input type="email" required className="form-control mt-1" placeholder="Email Address" {...email} />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input type="password" required className="form-control mt-1" placeholder="Password" {...password} />
        </div>
        {mode === "signup" && (
          <div className="form-group mt-3">
            <label>Please Enter Password Again</label>
            <input type="password" required className="form-control mt-1" placeholder="Password" {...passwordAgain} />
          </div>
        )}
        {errorMessages.length > 0 && (
          <ul>
            {errorMessages.map((msg) => (
              <li key={msg} className="error">{msg}</li>
            ))}
          </ul>
        )}
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-secondary">{mode === "signin" ? "Submit" : "Register"}</button>
        </div>
        {mode === "signin" && (
          <p className="text-center mt-2">
            Forgot <span className="link-primary" onClick={handlePasswordReset}>Password?</span>
          </p>
        )}
      </div>
    </form>
  );

  return (
    <div className="auth-form-container">
      {renderForm(authMode)}
    </div>
  );
};

export default Authentication;

