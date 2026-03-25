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
  secondaryButtonText,
  onSecondaryClick,
  buttonVariant = "item",
}) {
  const isOpen = activeModal === name;

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const submitButtonClassName = `modal__submit modal__submit_type_${buttonVariant}`;
    

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

          <div className="modal__actions">
            <button
              type="submit"
              className={submitButtonClassName}
              aria-label={buttonText || "Submit"}
              disabled={isSubmitDisabled}
            >
              {buttonText || "Submit"}
            </button>

            {secondaryButtonText && onSecondaryClick && (
              <button
                type="button"
                className="modal__secondary-button"
                onClick={onSecondaryClick}
                aria-label={secondaryButtonText}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
