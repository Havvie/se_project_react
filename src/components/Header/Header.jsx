import  { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/wtwr.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ 
  handleAddClick, 
  handleLoginClick,
  handleRegisterClick,
  weatherData,
  isLoggedIn, 
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || "";
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo-link">
          <img 
            src={logo} 
            alt="WTWR Logo" 
            className="header__logo" 
          />
        </NavLink>
          <p className="header__date-and-location">
            {currentDate}, {weatherData.city}
          </p>
      </div>

      <div className="header__controls">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
          <button
              type="button"
              className="header__add-clothes-btn"
              onClick={handleAddClick}
          >
              + Add Clothes
          </button>

        <NavLink to="/profile" className="header__nav-link">
          <div className="header__username">{userName}</div>

          {userAvatar ? (
            <img 
              src={avatar} 
              alt="Terrence Tegegne" 
              className="header__avatar" 
            />
          ) : (
            <div className="header__avatar header__avatar_placeholder">
              {firstLetter}
            </div>
          )}
          </NavLink>
        </>
      ) : (
        <>
          <button
            type="button"
            className="header__auth-button"
            onClick={handleRegisterClick}
          >
            Sign Up
          </button>

          <button
            type="button"
            className="header__auth-button"
            onClick={handleLoginClick}
          >
            Log In
          </button>
        </>
      )}
      </div>
    </header>
  );
}

export default Header;
