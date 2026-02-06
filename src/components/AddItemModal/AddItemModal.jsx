import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ activeModal, onAddItem, onClose }) => {
    const defaultValues = { 
        name: "", 
        imageUrl: "",
        weatherType: "",
    };
    const { values, handleChange } = useForm(defaultValues);
    
    function handleSubmit(evt) {
        evt.preventDefault();
        onAddItem(values);
    }
    
    return (
        <ModalWithForm 
            name="add-garment" 
            title="New garment" 
            activeModal={activeModal}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label htmlFor="name" className="modal__label">
                Name
                <input
                type="text"
                name="name"
                className="modal__input"
                id="name"
                placeholder="Name"
                minLength="2"
                maxLength="30"
                required
                value={values.name}
                onChange={handleChange}
                />
                <span className="modal__error" id="place-name-error" />
            </label>
            <label htmlFor="imageUrl" className="modal__label">
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
                />
                <span className="modal__error" id="place-link-error" />
            </label>
            <fieldset className="modal__radio-buttons">
                <legend className="modal__legend">Select the weather type:</legend>
                <label
                    htmlFor="hot"
                    className="modal__label modal__input_type_radio"
                >
                    <input
                        id="hot"
                        type="radio"
                        name="weatherType"
                        className="modal__radio-input"
                        value="hot"
                        checked={values.weatherType === "hot"}
                        onChange={handleChange}
                    />
                Hot
                </label>

                <label
                    htmlFor="warm"
                    className="modal__label modal__input_type_radio"
                >
                    <input
                        id="warm"
                        type="radio"
                        name="weatherType"
                        className="modal__radio-input"
                        value="warm"
                        checked={values.weatherType === "warm"}
                        onChange={handleChange}
                    />
                Warm
                </label>

                <label
                    htmlFor="cold"
                    className="modal__label modal__input_type_radio"
                >
                    <input
                        id="cold"
                        type="radio"
                        name="weatherType"
                        className="modal__radio-input"
                        value="cold"
                        checked={values.weatherType === "cold"}
                        onChange={handleChange}
                    />{" "}
                    Cold
                </label>
            </fieldset>
        </ModalWithForm>
    );
};

export default AddItemModal;