import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { connectFunctionsEmulator, httpsCallable } from "firebase/functions";
import React, { useMemo, useState } from "react";
import useAuth from "../hooks/useAuth";
import useCards from "../hooks/useCards";
import { addCard, deleteCard, functions, logout, updateCard } from "../services/Firebase";
import Card from "./Card";
import FormModal from "./CardFormModal";
import Faq from "./Faq";

if (import.meta.env.VITE_APP_ENV === "development") {
  // Connect to the local emulator
  connectFunctionsEmulator(functions, "localhost", 5001);
}

const Dashboard = ({ openToast }) => {
  const { user } = useAuth();
  const cards = useCards(user.uid);
  const [searchQuery, setSearchQuery] = useState("");
  const [formState, setFormState] = useState({
    id: -1,
    name: "",
    phone: "",
    birthDate: new Date(),
  });

  const sendReminder = async (card) => {
    const sendReminderFunction = httpsCallable(functions, "sendEmail");

    try {
      const message = `
      REMINDER: ${card.name}'s birthday is on ${card.formattedBirthDate}! 🎉🎂
      Don't forget to wish them a happy birthday! 🎈🎁
      Phone: ${card.phone}
      `;
      const result = await sendReminderFunction({ to: user.email, message });
      if (result.data.success) {
        console.log("Message sent successfully:", result.data.response);
      } else {
        console.error("Error sending message:", result.data.error);
      }
    } catch (error) {
      console.error("Error calling function:", error);
    }
  };

  const handleSignOut = async () => {
    const result = await logout();
    openToast(result);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (cardId) => {
    const result = await deleteCard(user.uid, cardId);
    openToast(result);
  };

  const handleAdd = async () => {
    const result = await addCard(user.uid, formState);
    openToast(result);
    return result.status;
  };

  const handleEdit = async () => {
    const payload = {
      name: formState.name,
      phone: formState.phone,
      birthDate: formState.birthDate,
    };
    const result = await updateCard(user.uid, formState.id, payload);
    openToast(result);
    return result.status;
  };

  const filteredCards = useMemo(
    () =>
      cards.filter((card) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [cards, searchQuery]
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">
            {user?.displayName ? `Hello, ${user.displayName}!` : "Birthday Notifications"}
          </span>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => { setFormState({ name: "", phone: "", birthDate: new Date() }) }}
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
                  onClick={() => { setFormState({ name: "", phone: "", birthDate: new Date() }) }}
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
              <li className="nav-item" onClick={handleSignOut}>
                <span className="nav-link">Sign Out</span>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search By Name"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="btn btn-outline-secondary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="card-container">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleEditForm={() => {
              setFormState({
                id: card.id,
                name: card.name,
                phone: card.phone,
                birthDate: new Date(card.birthDate.seconds * 1000),
              })
            }}
            handleDelete={() => handleDelete(card.id)}
            handleReminder={() => sendReminder(card)}
          />
        ))}
      </div>

      <FormModal
        modalId="addModal"
        title="Add a New Birthday"
        handleAction={handleAdd}
        formState={formState}
        setFormState={setFormState}
        closeClassName="close-add-modal"
      />
      <FormModal
        modalId="editModal"
        title="Edit Birthday"
        handleAction={handleEdit}
        formState={formState}
        setFormState={setFormState}
        closeClassName="close-edit-modal"
      />
      <Faq />
    </>
  );
};

export default Dashboard;


