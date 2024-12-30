import React, { useState } from "react";
import DatePicker from "react-date-picker";

const FormModal = ({ handleAction, modalId, initialValues }) => {
  const [name, setName] = useState(initialValues.name);
  const [phone, setPhone] = useState(initialValues.phone);
  const [birthDate, setBirthDate] = useState(initialValues.birthDate);

  const handleCreation = (event) => {
    event.preventDefault();
    document.querySelector(".modal-close").click();
    setTimeout(async () => {
      handleAction({ name, phone, birthDate });
    }, 300);
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add a New Birthday</h5>
            <button
              type="button"
              className="btn-close modal-close"
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

export default FormModal;
