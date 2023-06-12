import React from "react";

const Auth = () => {
  const prismRef = React.useRef();

  const showSignup = () => {
    prismRef.current.style.transform = "translateZ(-100px) rotateY( -90deg)";
  };

  const showLogin = () => {
    prismRef.current.style.transform = "translateZ(-100px)";
  };

  const showForgotPassword = () => {
    prismRef.current.style.transform = "translateZ(-100px) rotateY( -180deg)";
  };

  const showRegisterConfirmation = () => {
    prismRef.current.style.transform = "translateZ(-100px) rotateX( 90deg)";
  };

  const showForgotPasswordConfirmation = () => {
    prismRef.current.style.transform = "translateZ(-100px) rotateX( -90deg)";
  };

  return (
    <div className="wrapper">
      <div className="rec-prism" ref={prismRef}>
        <div className="face face-front">
          <div className="content">
            <h2>Sign in</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field-wrapper">
                <input type="text" name="username" />
                <label>Username</label>
              </div>
              <div className="field-wrapper">
                <input type="password" name="password" />
                <label>Password</label>
              </div>
              <div className="field-wrapper">
                <input type="submit" />
              </div>
              <span className="psw" onClick={showForgotPassword}>
                Forgot password?
              </span>
              <span className="signup" onClick={showSignup}>
                Not a user? Sign up
              </span>
            </form>
          </div>
        </div>

        <div className="face face-back">
          <div className="content">
            <h2>Forgot your password?</h2>
            <small>
              Enter your email so we can send you a reset link for your password
            </small>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field-wrapper">
                <input type="text" name="email" placeholder="email" />
                <label>E-mail</label>
              </div>
              <div className="field-wrapper">
                <input type="submit" onClick={showForgotPasswordConfirmation} />
              </div>
            </form>
          </div>
        </div>

        <div className="face face-right">
          <div className="content">
            <h2>Sign up</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field-wrapper">
                <input type="text" name="email" />
                <label>E-mail</label>
              </div>
              <div className="field-wrapper">
                <input type="password" name="password" />
                <label>Password</label>
              </div>
              <div className="field-wrapper">
                <input type="password" name="password2" />
                <label>Re-enter password</label>
              </div>
              <div className="field-wrapper">
                <input type="submit" onClick={showRegisterConfirmation} />
              </div>
              <span className="singin" onClick={showLogin}>
                Already a user? Sign in
              </span>
            </form>
          </div>
        </div>

        <div className="face face-top">
          <div className="content">
            <div className="confirmation-msg">
              Your email has been sent <br />
              <span className="login-again" onClick={showLogin}>
                Click here to sign in
              </span>
            </div>
          </div>
        </div>

        <div className="face face-bottom">
          <div className="content">
            <div className="confirmation-msg">
              Thank you for registering. Please check your email. <br />
              <span className="login-again" onClick={showLogin}>
                Click here to sign in
              </span>
            </div>
          </div>
        </div>

        <div className="face face-left">
          <div className="content"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
