import React, { useState } from "react";
import "./Header.css"
import logo from "../../assets/wtwr.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
    const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

    function toggleMobileMenu() {
        setIsMobileMenuOpened((prev) => !prev);
    } 
    
    const currentDate = new Date().toLocaleString('default', { 
        month: 'long', day: 'numeric' });
    return (
        <header className="header">
            <img src={logo} alt="WTWR Logo" className="header__logo" />
            <p className="header__date-and-location">{currentDate}, {weatherData.city}</p>
            <button type="button" className="header__add-clothes-btn" onClick={handleAddClick}>+ Add Clothes</button>
            <div className="header__user-container">
                <p className="header__username">Terrence Tegegne</p>
                <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
            </div>
        </header>
    );
}

export default Header;