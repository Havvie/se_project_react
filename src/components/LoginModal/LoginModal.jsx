import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ 
  activeModal, 
  onClose, 
  onLogin,
  onSwitchToRegister, 
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
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

    onLogin(formData).catch((err) => {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        general: "Login failed. Please check your email and password.",
      }));
    });
  };

  return (
    <ModalWithForm
      name="login"
      title="Log in"
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log in"
      secondaryButtonText="or Sign Up"
      onSecondaryClick={onSwitchToRegister}
      buttonVariant="login"
    >
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

export default LoginModal;
