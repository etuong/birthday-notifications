import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { connectFunctionsEmulator, httpsCallable } from "firebase/functions";
import React, { useMemo, useState } from "react";
import { useTheme } from '../context/ThemeContext';
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
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [formState, setFormState] = useState({
    id: -1,
    name: "",
    phone: "",
    isDisabled: false,
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
      return result;
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

  const handleEdit = async (payload) => {
    const result = await updateCard(user.uid, payload.id, payload);
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
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <span className="navbar-brand">
            {user?.displayName ? `Hello, ${user.displayName}!` : "Birthday Notifications"}
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
                  data-bs-target="#addModal"
                  onClick={() => { setFormState({ name: "", phone: "", isDisabled: false, birthDate: new Date() }) }}
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
            <div className="form-check form-switch me-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="themeToggle"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <label className="form-check-label" htmlFor="themeToggle">
                {theme === 'light' ? 'Light' : 'Dark'}
              </label>
            </div>
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
                isDisabled: card.isDisabled,
                birthDate: new Date(card.birthDate.seconds * 1000),
              })
            }}
            handleDisable={() => handleEdit({ id: card.id, isDisabled: !card.isDisabled })}
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
        handleAction={() => handleEdit({ ...formState })}
        formState={formState}
        setFormState={setFormState}
        closeClassName="close-edit-modal"
      />
      <Faq />
    </div>
  );
};

export default Dashboard;


