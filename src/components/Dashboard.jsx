import React, { useState } from "react";
import { logout } from "../services/Firebase";
import useAuth from "../hooks/useAuth";
import DatePicker from "react-date-picker";
import Faq from "./Faq";

const FormModal = (props) => {
  const [name, setName] = useState(props?.name || "");
  const [phone, setPhone] = useState(props?.phone || "");
  const [date, setDate] = useState(props?.date || new Date());

  const handleCreation = (event) => {
    event.preventDefault();
    alert(`${name} ${phone} ${date}`);
  };

  return (
    <div
      className="modal fade"
      id="formModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add a New Birthday</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => handleCreation(e)}>
              <div className="mb-3">
                <label htmlFor="name" className="col-form-label">
                  Person's Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Jane Doe"
                  id="name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="col-form-label">
                  Person's Phone Number:
                </label>
                <input
                  type="tel"
                  className="form-control"
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="911-123-4567"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  id="phone"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="date" className="col-form-label">
                  Birth Date:
                </label>
                <DatePicker
                  id="date"
                  onChange={setDate}
                  clearIcon={null}
                  openCalendarOnFocus={false}
                  value={date}
                  required
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = (props) => {
  const { user } = useAuth();

  const handleSignOut = async (event) => {
    event.preventDefault();
    const result = await logout();
    props.openToast(result);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">
            {user.displayName
              ? `Hello, ${user.displayName}!`
              : "Birthday Notifications"}
          </span>
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
                <span
                  className="nav-link"
                  data-bs-toggle="modal"
                  data-bs-target="#formModal"
                >
                  Add
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  data-bs-toggle="modal"
                  data-bs-target="#faqModal"
                >
                  Faqs
                </span>
              </li>
              <li className="nav-item" onClick={(e) => handleSignOut(e)}>
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
            <div className="card-header">
              Jan 23
              <div className="controls">
                <span className="icon">✏️</span>
                <span className="icon">❌</span>
              </div>
            </div>
            <div className="card-body text-dark">
              <h5 className="card-title">Ethan Uong</h5>
              <h6 class="card-subtitle mb-2 text-muted">626-951-7753</h6>
              <p className="card-text">
                Ethan will turn 23 years old in 256 days!
              </p>
            </div>
          </div>
        ))}
      </div>
      <FormModal />
      <Faq />
    </>
  );
};

export default Dashboard;
