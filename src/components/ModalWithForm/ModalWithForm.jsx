import "./ModalWithForm.css";

function ModalWithForm({
  children, 
  title, 
  activeModal, 
  onClose,
  name
}) {
  return (
    <div className={`modal ${activeModal === name ? "modal__opened" : ""}`}> 
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button 
          type="button" 
          className="modal__close modal__close_type_form" 
          onClick={onClose}
        >
        </button>
      <form 
        className="modal__form" 
        name={name} 
        noValidate>
        {children}
          <button 
            type="submit" 
            className="modal__submit"
            aria-label="Add garment"
          ></button>
      </form>
      </div>
    </div>
  );  
}

export default ModalWithForm;
