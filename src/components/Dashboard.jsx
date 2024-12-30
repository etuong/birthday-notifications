import React from "react";
import { logout, addCard, deleteCard } from "../services/Firebase";
import useAuth from "../hooks/useAuth";
import { useCards } from "../hooks/useCards";
import Faq from "./Faq";
import { Card } from "./Card";
import FormModal from "./FormModal";

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
            data-bs-target="#addModal"
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
                  data-bs-target="#addModal"
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
              key={card.id}
              card={card}
              handleEdit={(_) => { }}
              handleDelete={async (_) => {
                const result = await deleteCard(user.uid, card.id);
                props.openToast(result);
              }}
            />
          );
        })}
      </div>
      <FormModal
        modalId="addModal"
        handleAction={async (dateObj) => {
          const result = await addCard(user.uid, dateObj);
          props.openToast(result);
        }}
        initialValues={{ name: "", phone: "", birthDate: new Date() }}
      />
      <FormModal
        modalId="editModal"
        handleAction={async (dateObj) => {
          const result = await addCard(user.uid, dateObj);
          props.openToast(result);
        }}
        initialValues={{ name: "", phone: "", birthDate: new Date() }}
      />
      <Faq />
    </>
  );
};

export default Dashboard;
