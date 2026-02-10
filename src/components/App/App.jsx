import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { getItems, addItem, removeItem } from "../../utils/api";


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
  const [itemToDelete, setItemToDelete] = useState(null);
  

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

  const handleCloseModal = () => {
    setActiveModal("");
    setItemToDelete(null);
  };

  const onAddItem = (inputValues, resetForm) => {
      const newCardData = {
        name: inputValues.name,
        imageUrl: inputValues.imageUrl,
        weather: inputValues.weatherType,
    };
    
    return addItem(newCardData).then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        if (typeof resetForm === "function") resetForm();
        handleCloseModal();
        return data;
      })
  };

  const openDeleteConfirmation = (card) => {
    setItemToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return Promise.resolve();

    return removeItem(itemToDelete._id).then(() => {
        setClothingItems((prev) =>
        prev.filter((item) => item._id !== itemToDelete._id)
      );
      handleCloseModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
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
        .then((items) => setClothingItems(items))
        .catch(console.error);
  }, []);

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
                  onAddClick={handleAddClick} 
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
          onDeleteItem={openDeleteConfirmation}
        />
        <DeleteConfirmationModal
          activeModal={activeModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}
export default App;
