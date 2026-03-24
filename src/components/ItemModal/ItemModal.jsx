import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ 
  activeModal, 
  card, 
  onClose, 
  onDeleteItem, 
  isLoggedIn 
}) {
  const currentUser = useContext(CurrentUserContext);

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const ownerId =
    typeof card?.owner === "string" ? card.owner : card?.owner?._id;

  const isOwn = isLoggedIn && currentUser && ownerId === currentUser._id;

  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal__opened" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close modal__close_type_image"
          onClick={onClose}
        />
        <img
          src={card.imageUrl}
          alt={card.name || "Clothing item"}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__footer-row">
            <h2 className="modal__caption">{card.name}</h2>

            {isOwn && (
              <button
                type="button"
                className="modal__delete"
                onClick={() => onDeleteItem(card)}
              >
                Delete item
              </button>
            )}
          </div>

          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
