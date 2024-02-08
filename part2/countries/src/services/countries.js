import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_KEY;

const allUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const countryUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";
const weatherUrl = "https://api.openweathermap.org/data/2.5";

const getAll = () => {
  const request = axios.get(allUrl);
  return request.then((response) => response.data);
};

const getCountry = (country) => {
  const request = axios.get(`${countryUrl}/${country}`);
  return request.then((response) => response.data);
};

const getWeather = (capital) => {
  const request = axios.get(
    `${weatherUrl}/weather?q=${capital}&appid=${apiKey}&units=metric`
  );
  return request.then((response) => response.data);
};

export default { getAll, getCountry, getWeather };
