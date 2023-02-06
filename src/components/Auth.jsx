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

  const showThankYou = () => {
    prismRef.current.style.transform = "translateZ(-100px) rotateX( 90deg)";
  };

  return (
    <div>
      <div className="wrapper">
        <div className="rec-prism" ref={prismRef}>
          <div className="face face-top">
            <div className="content">
              <h2>Subscribe</h2>
              <small>
                Enter your email so we can send you the latest updates!
              </small>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="field-wrapper">
                  <input type="text" name="email" placeholder="email" />
                  <label>e-mail</label>
                </div>
                <div className="field-wrapper">
                  <input type="submit" onClick={showThankYou} />
                </div>
              </form>
            </div>
          </div>

          <div className="face face-front">
            <div className="content">
              <h2>Sign in</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="field-wrapper">
                  <input type="text" name="username" placeholder="username" />
                  <label>username</label>
                </div>
                <div className="field-wrapper">
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    autoComplete="new-password"
                  />
                  <label>password</label>
                </div>
                <div className="field-wrapper">
                  <input type="submit" onClick={showThankYou} />
                </div>
                <span className="psw" onClick={showForgotPassword}>
                  Forgot Password?{" "}
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
                Enter your email so we can send you a reset link for your
                password
              </small>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="field-wrapper">
                  <input type="text" name="email" placeholder="email" />
                  <label>e-mail</label>
                </div>
                <div className="field-wrapper">
                  <input type="submit" onClick={showThankYou} />
                </div>
              </form>
            </div>
          </div>

          <div className="face face-right">
            <div className="content">
              <h2>Sign up</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="field-wrapper">
                  <input type="text" name="email" placeholder="email" />
                  <label>e-mail</label>
                </div>
                <div className="field-wrapper">
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    autoComplete="new-password"
                  />
                  <label>password</label>
                </div>
                <div className="field-wrapper">
                  <input
                    type="password"
                    name="password2"
                    placeholder="password"
                    autoComplete="new-password"
                  />
                  <label>re-enter password</label>
                </div>
                <div className="field-wrapper">
                  <input type="submit" onClick={showThankYou} />
                </div>
                <span className="singin" onClick={showLogin}>
                  Already a user? Sign in
                </span>
              </form>
            </div>
          </div>

          <div className="face face-bottom">
            <div className="content">
              <div className="thank-you-msg">Thank you!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
