import { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ activeModal, onClose, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (activeModal === "edit-profile" && currentUser) {
      setFormData({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [activeModal, currentUser]);

  const isFormValid = formData.name.trim() && formData.avatar.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    onUpdateProfile(formData);
  };

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile data"
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save changes"
      buttonVariant="save"
      isSubmitDisabled={!isFormValid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          value={formData.name}
          onChange={handleChange}
          required
          minLength="2"
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          value={formData.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;