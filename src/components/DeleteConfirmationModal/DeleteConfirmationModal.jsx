import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ activeModal, onClose, onConfirm}) {
    return (
        <div className={`modal ${activeModal === "confirm-delete" ? "modal__opened": ""}`}>
            <div className="modal__content modal__content_type_confirm">
                <button
                    type="button"
                    className="modal__close modal__close_type_form"
                    onClick={onClose}
                    aria-label="Close modal"
                />

                <div className="modal__content_text">
                    <h2 className="modal__title modal__title_type_confirm">
                        Are you sure you want to delete this item?
                    </h2>
                    <p className="modal__subtitle">This action is irreversible.</p>
                </div>
                <div className="modal__confirm-action">
                    <button
                        type="button"
                        className="modal__confirm-delete"
                        onClick={onConfirm}>
                            Yes, delete item
                        </button>
                        <button
                            type="button"
                            className="modal__confirm-cancel"
                            onClick={onClose}>
                                Cancel
                            </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;