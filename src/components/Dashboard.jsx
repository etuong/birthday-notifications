import React from "react";
import { logout } from "../services/Firebase";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Hello, {user.displayName}!
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <span className="nav-link">Home</span>
              </li>
              <li className="nav-item" onClick={(e) => logout()}>
                <span className="nav-link">Sign Out</span>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-secondary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="card-container">
        {Array.apply(null, { length: 10 }).map((e, i) => (
          <div className="card border-dark mb-3" key={i}>
            <div className="card-header">Jan 23 ✎</div>
            <div className="card-body text-dark">
              <h5 className="card-title">Ethan Uong</h5>
              <p className="card-text">
                Ethan will turn 23 years old in 256 days!
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
