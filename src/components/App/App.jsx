import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { getItems, addItem } from "../../utils/api";


function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };


  const onAddItem = (inputValues) => {
      const newCardData = {
        name: inputValues.name,
        imageUrl: inputValues.imageUrl,
        weather: inputValues.weatherType,
    };
    
    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error);
  };

   const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      APIkey,
    })
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);

      getItems()
      // TODO make new items appear first
      // HINT look how to reverse an array in JS
        .then((items) => setClothingItems(items))
        .catch(console.error);
  }, []);

  // TODO
  // - Add a delete button to the preview modal
  // - Declare a handler in App.jsx (deleteItemHandler)
  // - Pass handler to preview modal
  // - Inside preview modal, pass the ID as an argumen to the handler (use the handler pattern found in ItemCard)
  // - call removeItem function ot pass it the ID
  // - in the .then() remove the item from the array
  // - how? filter
  // const filteredArr = arr.filter((item) => { return item._id != id;})

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route 
              path="/" 
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              } 
          />
            <Route 
              path="/profile" 
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems} 
              />
            } 
          />
          </Routes>
          
         <Footer />
        </div>

        <AddItemModal
          activeModal={activeModal}
          onAddItem={onAddItem}
          onClose={handleCloseModal}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={handleCloseModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}
export default App;
