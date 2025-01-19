import React from "react";
import Swal from "sweetalert2";

const Card = React.memo(({ filteredCards, handleEditForm, handleReminder, handleDelete }) => {
  const confirmAndHandleReminder = (card) => {
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

  const confirmAndHandleDelete = (card) => {
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
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Birth Date</th>
            <th scope="col">Phone</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCards.map((card) => (
            <tr key={card.id}>
              <td>{card.name}</td>
              <td>{card.formattedBirthDate}</td>
              <td>{card.phone}</td>
              <td> Will turn {card.age} years old in {card.daysToBirthday}{" "}
                days!</td>
              <td>
                <button className="btn btn-success" onClick={() => handleEditForm(card)}>
                  Edit
                </button>
                <button className="btn btn-primary mx-2" onClick={() => confirmAndHandleReminder(card)}>
                  Remind
                </button>
                <button className="btn btn-danger" onClick={() => confirmAndHandleDelete(card)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Card;

