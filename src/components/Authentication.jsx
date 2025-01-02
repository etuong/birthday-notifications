import React, { useCallback, useMemo, useState } from "react";
import useInput from "../hooks/useInput";
import { login, registerUser, resetPassword } from "../services/Firebase";

const Authentication = ({ openToast }) => {
  const [mode, setMode] = useState("signin");
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");
  const [errors, setErrors] = useState([]);

  const toggleMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "signin" ? "signup" : "signin"));
    setErrors([]);
  }, []);

  const validateInputs = useCallback(() => {
    const validation = [];
    if (!email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
      validation.push("Please enter a valid email address");
    if (mode === "signup") {
      if (password.value.length < 6 || confirmPassword.value.length < 6)
        validation.push("Password(s) should be at least 6 characters");
      else if (password.value !== confirmPassword.value)
        validation.push("Passwords are not the same");
    }
    return validation;
  }, [mode, email.value, password.value, confirmPassword.value]);

  const handleAction = useCallback(
    async (action) => {
      const validation = validateInputs();
      setErrors(validation);
      if (validation.length === 0) {
        const result = await action();
        openToast(result);
      }
    },
    [openToast, validateInputs]
  );

  const signinForm = useMemo(
    () => (
      <div className="auth-form-container">
        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAction(() => login(email.value, password.value));
          }}
        >
          <div className="auth-form-content">
            <h3 className="auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={toggleMode}>
                Register
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                required
                className="form-control mt-1"
                placeholder="Enter email"
                {...email}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                required
                className="form-control mt-1"
                placeholder="Enter password"
                {...password}
              />
            </div>
            <ErrorMessages errorMessages={errors} />
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-secondary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot{" "}
              <span
                className="link-primary"
                onClick={() => handleAction(() => resetPassword(email.value))}
              >
                Password?
              </span>
            </p>
          </div>
        </form>
      </div>
    ),
    [email, password, errors, toggleMode, handleAction]
  );

  const signupForm = useMemo(
    () => (
      <div className="auth-form-container">
        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAction(() =>
              registerUser(name.value, email.value, password.value)
            );
          }}
        >
          <div className="auth-form-content">
            <h3 className="auth-form-title">Register</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={toggleMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                type="text"
                required
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                {...name}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                required
                className="form-control mt-1"
                placeholder="Email Address"
                {...email}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                required
                className="form-control mt-1"
                placeholder="Password"
                {...password}
              />
            </div>
            <div className="form-group mt-3">
              <label>Please Enter Password Again</label>
              <input
                type="password"
                required
                className="form-control mt-1"
                placeholder="Password"
                {...confirmPassword}
              />
            </div>
            <ErrorMessages errorMessages={errors} />
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-secondary">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    ),
    [name, email, password, confirmPassword, errors, toggleMode, handleAction]
  );

  return <div className="auth-form-container">{mode === "signin" ? signinForm : signupForm}</div>;
};

const ErrorMessages = ({ errorMessages }) => (
  errorMessages.length > 0 && (
    <ul>
      {errorMessages.map((errorMessage, index) => (
        <li key={index} className="error">
          {errorMessage}
        </li>
      ))}
    </ul>
  )
);

export default Authentication;

