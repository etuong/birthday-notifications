import React from "react";

export const Card = ({ card, handleEdit, handleDelete }) => {
  return (
    <div className="card border-dark mb-3" key={card.id}>
      <div className="card-header">
        <strong>{card.monthDay}</strong>
        <div className="controls">
          <span
            className="icon"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
            onClick={handleEdit}
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
          Will turn {card.yearDifference} years old in {card.daysToBirthday}{" "}
          days!
        </p>
      </div>
    </div>
  );
};
