import React from "react";
import Swal from "sweetalert2";

const Card = React.memo(({ card, handleEditForm, handleReminder, handleDelete }) => {
  const confirmAndHandleReminder = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to send a reminder for ${card.name}'s birthday?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, email me!',
      cancelButtonText: 'No, cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await handleReminder(card);
        if (result && result.data.success) {
          Swal.fire(
            'Sent!',
            'The reminder has been sent.',
            'success'
          );
        } else {
          Swal.fire(
            'Not Sent!',
            'The reminder has not been sent. There is an error!',
            'error'
          );
        }
      }
    });
  };

  const confirmAndHandleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete this birthday?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(card);
      }
    });
  };

  return (
    <div className="card mb-3" key={card.id}>
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
          <span className="icon" onClick={confirmAndHandleReminder}>
            🕔
          </span>
          <span className="icon" onClick={confirmAndHandleDelete}>
            ❌
          </span>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{card.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{card.phone}</h6>
        <p className="card-text">
          Will turn {card.age} years old in {card.daysToBirthday}{" "}
          days!
        </p>
      </div>
    </div>
  );
});

export default Card;

