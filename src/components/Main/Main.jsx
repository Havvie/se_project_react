import "./Main.css";
import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ 
    weatherData, 
    handleCardClick, 
    clothingItems,
    onCardLike,
    isLoggedIn 
  }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = weatherData.type
    ? clothingItems.filter((item) => item.weather === weatherData.type)
    : clothingItems;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>

        <ul className="cards__list">
          {filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
              />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
