import React from "react";

const Card = React.memo(({ card, handleEditForm, handleDelete }) => (
  <div className="card border-dark mb-3" key={card.id}>
    <div className="card-header">
      <strong>{card.formattedBirthDate}</strong>
      <div className="controls">
        <span
          className="icon"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
          onClick={handleEditForm}
        >
          ✏️
        </span>
        <span className="icon" onClick={handleDelete}>
          ❌
        </span>
      </div>
    </div>
    <div className="card-body text-dark">
      <h5 className="card-title">{card.name}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{card.phone}</h6>
      <p className="card-text">
        Will turn {card.age} years old in {card.daysToBirthday}{" "}
        days!
      </p>
    </div>
  </div>
));

export default Card;

