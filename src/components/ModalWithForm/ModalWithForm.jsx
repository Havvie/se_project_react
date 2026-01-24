import "./ModalWithForm.css";

function ModalWithForm({
  children, 
  butttonText, 
  title, 
  activeModal, 
  onClose,
}) {
  return (
    <div className={`modal ${activeModal === "add.garmet" ? "modal__opened" : ""}`}> 
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button 
          type="button" 
          className="modal__close" 
          onClick={onClose}>
        </button>
      <form className="modal__form">
        {children}
          <button type="submit" className="modal__submit">
            {butttonText}
          </button>
      </form>
      </div>
    </div>
  );  
}

export default ModalWithForm;
