import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ 
  activeModal, 
  onClose, 
  onRegister,
  onSwitchToLogin, 
}) {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
    general: "",
  });

  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validationMessage,
      general: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long",
      }));
      return;
    }

    onRegister(formData)
      .then(() => {
        setFormData({
          name: "",
          avatar: "",
          email: "",
          password: "",
        });
        setErrors({
          name: "",
          avatar: "",
          email: "",
          password: "",
          general: "",
        });
      })
      .catch((err) => {
        console.error(err);
        setErrors((prev) => ({
          ...prev,
          general: "Registration failed. Please check your information.",
        }));
      });
  };

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign up"
      secondaryButtonText="or Log in"
      onSecondaryClick={onSwitchToLogin}
      buttonVariant="signup"
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
        <span className="modal__error">{errors.name}</span>
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
        <span className="modal__error">{errors.avatar}</span>
      </label>

      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="6"
        />
        <span className="modal__error">{errors.password}</span>
      </label>

      {errors.general && (
        <p className="modal__error modal__error_type_general">
          {errors.general}
        </p>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
