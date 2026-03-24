import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import { getUserCoordinates } from "../../utils/geolocation";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import * as auth from "../../utils/auth";
import {
  getItems,
  addItem,
  removeItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { setToken, getToken, removeToken } from "../../utils/token";

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

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleOpenAddModal = () => setActiveModal("add-garment");
  const handleOpenLoginModal = () => setActiveModal("login");
  const handleOpenRegisterModal = () => setActiveModal("register");
  const handleOpenEditProfileModal = () => setActiveModal("edit-profile");

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setItemToDelete(null);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    return auth
      .register(name, avatar, email, password)
      .then(() => auth.authorize(email, password))
      .then((res) => {
        setToken(res.token);
        return auth.checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    return auth
      .authorize(email, password)
      .then((res) => {
        setToken(res.token);
        return auth.checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    removeToken();
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = getToken();

    return updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const onAddItem = (inputValues, resetForm) => {
    const token = getToken();

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    return addItem(newCardData, token)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        if (typeof resetForm === "function") resetForm();
        handleCloseModal();
        return data;
      })
      .catch(console.error);
  };

  const openDeleteConfirmation = (card) => {
    setItemToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return Promise.resolve();

    const token = getToken();

    return removeItem(itemToDelete._id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== itemToDelete._id)
        );
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
        removeToken();
        setCurrentUser(null);
        setIsLoggedIn(false);
        navigate("/");
      });
  };
  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();

    const request = !isLiked
      ? addCardLike(id, token)
      : removeCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    const fetchWeatherForUserLocation = () => {
      getUserCoordinates()
        .then((userCoordinates) => {
          return getWeather({
            latitude: userCoordinates.latitude,
            longitude: userCoordinates.longitude,
            apiKey,
          });
        })
        .catch(() => {
          console.warn("Using default coordinates as fallback");
          return getWeather({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            apiKey,
          });
        })
        .then((data) => setWeatherData(filterWeatherData(data)))
        .catch(console.error);
    };

    fetchWeatherForUserLocation();

    getItems()
      .then((items) => setClothingItems(items))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setIsCheckingToken(false);
      return;
    }

    auth
      .checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        removeToken();
        setCurrentUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsCheckingToken(false);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleOpenAddModal}
              handleLoginClick={handleOpenLoginModal}
              handleRegisterClick={handleOpenRegisterModal}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isCheckingToken={isCheckingToken}
                  >
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={handleOpenAddModal}
                      onEditProfile={handleOpenEditProfileModal}
                      onSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
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
            isLoggedIn={isLoggedIn}
          />
          <DeleteConfirmationModal
            activeModal={activeModal}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
          />
          <LoginModal
            activeModal={activeModal}
            onClose={handleCloseModal}
            onLogin={handleLogin}
          />
          <RegisterModal
            activeModal={activeModal}
            onClose={handleCloseModal}
            onRegister={handleRegister}
          />
          <EditProfileModal
            activeModal={activeModal}
            onClose={handleCloseModal}
            onUpdateProfile={handleUpdateProfile}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
export default App;
