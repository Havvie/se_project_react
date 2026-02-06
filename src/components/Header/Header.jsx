import  { useState } from "react";
import "./Header.css";
import logo from "../../assets/wtwr.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import avatarDefault from "../../assets/avatar.svg";
import { NavLink } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpened((prev) => !prev);
  }

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__container">
        {/* TODO - link to home page */}
      <img 
        src={logo} 
        alt="WTWR Logo" 
        className="header__logo" 
      />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      </div>
      <div className="header__controls">
        <ToggleSwitch />

        <button
            type="button"
            className="header__add-clothes-btn"
            onClick={handleAddClick}
        >
            + Add Clothes
        </button>

        <NavLink to="/profile" className="header__nav-link">
        <div className="header__username">Terrence Tegegne</div>
        <img 
          src={avatar} 
          alt="Terrence Tegegne" 
          className="header__avatar" 
        />
     
        </NavLink>
        {isMobileMenuOpened && (
          <button
            type="button"
            className="header__mobile-close"
            onClick={handleMobileMenuClick}
            aria-label="Close menu"
          />
        )}
      </div>
    </header>
  );
}

export default Header;
