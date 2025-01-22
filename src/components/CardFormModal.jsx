import React, { useCallback, useMemo } from "react";
import DatePicker from "react-date-picker";

const CardFormModal = ({ title, handleAction, modalId, formState, setFormState, closeClassName }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormState((prevState) => ({ ...prevState, birthDate: date }));
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const status = await handleAction();
      if (status === "success") {
        const test = document.querySelector(`.${closeClassName}`);
        test.click();
      }
    },
    [handleAction, closeClassName]
  );

  const form = useMemo(
    () => (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="col-form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            value={formState.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            id="name"
            name="name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="col-form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            className="form-control"
            value={formState.phone}
            onChange={handleChange}
            placeholder="911-123-4567"
            pattern="^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$"
            id="phone"
            name="phone"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="col-form-label">
            Birth Date:
          </label>
          <DatePicker
            id="date"
            name="birthDate"
            value={formState.birthDate}
            onChange={handleDateChange}
            clearIcon={null}
            openCalendarOnFocus={false}
            required
          />
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className={`btn btn-secondary ${closeClassName}`}
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    ),
    [handleSubmit, formState, closeClassName]
  );

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
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close modal-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{form}</div>
        </div>
      </div>
    </div>
  );
};

export default CardFormModal;

