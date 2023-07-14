import React, { useState } from "react";
import { logout, addCard, deleteCard } from "../services/Firebase";
import useAuth from "../hooks/useAuth";
import { useCards } from "../hooks/useCards";
import DatePicker from "react-date-picker";
import Faq from "./Faq";
import { Card } from "./Card";

const Dashboard = (props) => {
  const { user } = useAuth();
  const cards = useCards();

  const handleSignOut = async (event) => {
    event.preventDefault();
    const result = await logout();
    props.openToast(result);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
  };

  const FormModal = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());

    const handleCreation = async (event) => {
      event.preventDefault();
      const result = await addCard(user.uid, { name, phone, birthDate });
      props.openToast(result);
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
                    onChange={setBirthDate}
                    clearIcon={null}
                    openCalendarOnFocus={false}
                    value={birthDate}
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
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    data-bs-backdrop="false"
                    className="btn btn-primary"
                  >
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
            data-bs-target="#formModal"
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
            <form className="d-flex" onSubmit={(event) => handleSearch(event)}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search By Name"
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
        {cards.map((card) => {
          return (
            <Card
              card={card}
              handleEdit={(_) => {}}
              handleDelete={async (_) => {
                const result = await deleteCard(user.uid, card.id);
                props.openToast(result);
              }}
            />
          );
        })}
      </div>
      <FormModal />
      <Faq />
    </>
  );
};

export default Dashboard;
