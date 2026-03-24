import { useEffect, useMemo, useState } from "react";
import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { isValidURL } from "../../utils/validation";

const NAME_MIN = 2;
const NAME_MAX = 30;

const AddItemModal = ({ activeModal, onAddItem, onClose }) => {
  const defaultValues = { name: "", imageUrl: "", weatherType: "" };
  const { values, handleChange, setValues } = useForm(defaultValues);

  const [touched, setTouched] = useState({
    name: false,
    imageUrl: false,
    weatherType: false,
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isOpen = activeModal === "add-garment";

  const resetForm = () => {
    setValues(defaultValues);
    setTouched({ name: false, imageUrl: false, weatherType: false });
    setHasSubmitted(false);
    setSubmitError("");
  };

  useEffect(() => {
    if (isOpen) resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const errors = useMemo(() => {
    const next = { name: "", imageUrl: "", weatherType: "" };

    const trimmedName = values.name.trim();
    if (!trimmedName) next.name = "Name is required.";
    else if (trimmedName.length < NAME_MIN)
      next.name = `Name must be at least ${NAME_MIN} characters.`;
    else if (trimmedName.length > NAME_MAX)
      next.name = `Name must be ${NAME_MAX} characters or less.`;

    const trimmedUrl = values.imageUrl.trim();
    if (!trimmedUrl) next.imageUrl = "Image URL is required.";
    else if (!isValidURL(trimmedUrl))
      next.imageUrl = "Enter a valid URL starting with http:// or https://";

    if (!values.weatherType) next.weatherType = "Please select a weather type.";

    return next;
  }, [values]);

  const isFormValid = useMemo(() => {
    return (
      !errors.name &&
      !errors.imageUrl &&
      !errors.weatherType &&
      values.name.trim() &&
      values.imageUrl.trim() &&
      values.weatherType
    );
  }, [errors, values]);

  const showNameError =
    (touched.name || hasSubmitted) && errors.name ? errors.name : "";

  const showUrlError =
    (touched.imageUrl || hasSubmitted) && errors.imageUrl
      ? errors.imageUrl
      : "";

  const showWeatherError =
    (touched.weatherType || hasSubmitted) && errors.weatherType
      ? errors.weatherType
      : "";

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");
    setHasSubmitted(true);

    if (!isFormValid) return;

    onAddItem(values, resetForm).catch(() => {
      setSubmitError("Something went wrong. Please try again.");
    });
  };

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Add garment"
      isSubmitDisabled={!isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          minLength={NAME_MIN}
          maxLength={NAME_MAX}
          required
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="modal__error">{showNameError}</span>
      </label>

      <label htmlFor="clothing-imageUrl" className="modal__label">
        Image URL
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="clothing-imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="modal__error">{showUrlError}</span>
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__input_type_radio">
          <input
            id="hot"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value="hot"
            checked={values.weatherType === "hot"}
            onChange={(e) => {
              handleChange(e);
              setTouched((prev) => ({ ...prev, weatherType: true }));
            }}
          />
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__input_type_radio">
          <input
            id="warm"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value="warm"
            checked={values.weatherType === "warm"}
            onChange={(e) => {
              handleChange(e);
              setTouched((prev) => ({ ...prev, weatherType: true }));
            }}
          />
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__input_type_radio">
          <input
            id="cold"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value="cold"
            checked={values.weatherType === "cold"}
            onChange={(e) => {
              handleChange(e);
              setTouched((prev) => ({ ...prev, weatherType: true }));
            }}
          />
          Cold
        </label>

        <span className="modal__error">{showWeatherError}</span>
      </fieldset>

      {submitError && <p className="modal__error-message">{submitError}</p>}
    </ModalWithForm>
  );
};

export default AddItemModal;
