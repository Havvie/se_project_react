import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  activeModal,
  onClose,
  name,
  onSubmit,
  buttonText,
  isSubmitDisabled,
}) {
  const isOpen = activeModal === name;

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal__opened" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal__close modal__close_type_form"
          onClick={onClose}
          aria-label="Close modal"
        />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <button
            type="submit"
            className="modal__submit"
            aria-label={buttonText || "Submit"}
            disabled={isSubmitDisabled}
          >
            {buttonText || "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
