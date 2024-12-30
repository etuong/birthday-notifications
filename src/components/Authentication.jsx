import React, { useState, useCallback, useMemo } from "react";
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

  const changeAuthMode = useCallback(() => {
    setAuthMode((prevAuthMode) => (prevAuthMode === "signin" ? "signup" : "signin"));
    setErrorMessages([]);
  }, []);

  const validateInputs = useCallback(() => {
    const validation = [];
    if (!email.value.match(validRegex)) validation.push("Please enter a valid email address");
    if (authMode === "signup") {
      if (password.value.length < 6 || passwordAgain.value.length < 6)
        validation.push("Password(s) should be at least 6 characters");
      else if (password.value !== passwordAgain.value)
        validation.push("Passwords are not the same");
    }
    return validation;
  }, [authMode, email.value, password.value, passwordAgain.value]);

  const handleAuthAction = useCallback(
    async (action) => {
      const validation = validateInputs();
      setErrorMessages(validation);
      if (validation.length === 0) {
        const result = await action();
        openToast(result);
      }
    },
    [openToast, validateInputs]
  );

  const loginForm = useMemo(
    () => (
      <div className="auth-form-container">
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
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
              <input type="email" required className="form-control mt-1" placeholder="Enter email" {...email} />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input type="password" className="form-control mt-1" placeholder="Enter password" {...password} />
            </div>
            <ErrorMessages errorMessages={errorMessages} />
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-secondary" onClick={() => handleAuthAction(() => login(email.value, password.value))}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot{" "}
              <span className="link-primary" onClick={() => handleAuthAction(() => resetPassword(email.value))}>
                Password?
              </span>
            </p>
          </div>
        </form>
      </div>
    ),
    [email, password, errorMessages, changeAuthMode, handleAuthAction]
  );

  const registerForm = useMemo(
    () => (
      <div className="auth-form-container">
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="auth-form-content">
            <h3 className="auth-form-title">Register</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Name</label>
              <input type="text" required className="form-control mt-1" placeholder="e.g Jane Doe" {...name} />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input type="email" required className="form-control mt-1" placeholder="Email Address" {...email} />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input type="password" required className="form-control mt-1" placeholder="Password" {...password} />
            </div>
            <div className="form-group mt-3">
              <label>Please Enter Password Again</label>
              <input type="password" required className="form-control mt-1" placeholder="Password" {...passwordAgain} />
            </div>
            <ErrorMessages errorMessages={errorMessages} />
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-secondary" onClick={() => handleAuthAction(() => registerUser(name.value, email.value, password.value))}>
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    ),
    [name, email, password, passwordAgain, errorMessages, changeAuthMode, handleAuthAction]
  );

  return <div className="auth-form-container">{authMode === "signin" ? loginForm : registerForm}</div>;
};

const ErrorMessages = ({ errorMessages }) => (
  errorMessages.length > 0 && (
    <ul>
      {errorMessages.map((errorMessage, index) => (
        <li key={index} className="error">{errorMessage}</li>
      ))}
    </ul>
  )
);

export default Authentication;

