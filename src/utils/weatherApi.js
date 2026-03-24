import { handleServerResponse } from "./api";

export const getWeather = ({ latitude, longitude, apiKey }) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(handleServerResponse);
};

export const filterWeatherData = (data) => {
  const tempF = Math.round(data.main.temp);
  
  return {
    city: data.name,
    temp: {
      F: tempF,
      C: Math.round(((tempF - 32) * 5) / 9),
    },
    type: getWeatherType(tempF),
    condition: data.weather[0].main.toLowerCase(),
    isDayTime: isDaytime({
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    }),
  };
};

const isDaytime = ({ sunrise, sunset }) => {
  const now = Date.now();
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (tempF) => {
  if (tempF >= 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
};
