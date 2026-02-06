export const getWeather =({ latitude, longitude, APIkey }) => {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
    ).then((res) => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Error: ${res.status}`)
        }
    });
};

export const filterWeatherData = (data) => {
    const result = {};
    result.city = data.name;
    result.temp = { 
        F: Math.round(data.main.temp), 
        C: Math.round(((data.main.temp - 32) * 5) / 9) 
    };
    result.type = getWeatherType(result.temp.F);
    result.condition = data.weather[0].main.toLowerCase();
    result.isDayTime = isDaytime({ sunrise: data.sys.sunrise, sunset: data.sys.sunset });
    return result;
};

const isDaytime = ({ sunrise, sunset }) => {
    const now = Date.now();
    return sunrise * 1000 < now && now < sunset * 1000;
    // const currentHour = now.getHours();
    // return currentHour >= (new Date(sunrise * 1000).getHours()) && currentHour < (new Date(sunset * 1000).getHours());
};

const getWeatherType =(weather) => {
if (weather >= 86) {
   return 'hot';
 } else if (weather >= 66 && weather < 86) {
   return 'warm';
 } else {
   return 'cold';
 }
}