import { useEffect, useState } from 'react';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer';

import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from '../../utils/constants';

function App() {
  const [weatherData, setWeatherData] = useState({
    type: 'cold',
    temp: { F: 999 },
    city: '',
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const handleCloseModal = () => {
    setActiveModal('');
  };

  useEffect(() => {
    getWeather({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      APIkey,
    })
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error('Error fetching weather data:', err);
      });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
      </div>

      <Footer />

      <ModalWithForm
        name="add-garment"
        title="New garment"
        activeModal={activeModal}
        onClose={handleCloseModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{' '}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
            minLength="2"
            required
          />
        </label>

        <label htmlFor="imageUrl" className="modal__label">
          Image URL{' '}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
            required
          />
        </label>

        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__input_type_radio">
            <input
              id="hot"
              type="radio"
              name="weather"
              value="hot"
              className="modal__radio-input"
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
            name="weather"
            value="warm"
            className="modal__radio-input"
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
              name="weather"
              value="cold"
              className="modal__radio-input"
            />
            {' '}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
