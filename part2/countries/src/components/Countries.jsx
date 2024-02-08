import { useEffect, useState } from "react";
import countryService from "../services/countries";

const iconsList = [
  { dayIcon: "01d", description: "clear sky" },
  { dayIcon: "02d", description: "few clouds" },
  { dayIcon: "03d", description: "scattered clouds" },
  { dayIcon: "04d", description: "broken clouds" },
  { dayIcon: "04d", description: "overcast clouds" },
  { dayIcon: "09d", description: "shower rain" },
  { dayIcon: "10d", description: "rain" },
  { dayIcon: "11d", description: "thunderstorm" },
  { dayIcon: "13d", description: "snow" },
  { dayIcon: "50d", description: "mist" },
];

const Countries = ({
  countriesMatchList,
  countryData,
  handleShowButton,
  setNotificationInfo,
}) => {
  const [weather, setWeather] = useState({});

  // Fetch weather data
  useEffect(() => {
    if (countriesMatchList.length === 1) {
      console.log("fetching weather...");
      countryService
        .getWeather(countryData.capital)
        .then((returnedWeather) => {
          // create icon url
          const dayIconCode = iconsList.filter(
            (icon) =>
              icon.description === returnedWeather.weather[0].description
          )[0].dayIcon;
          const dayIconUrl = `https://openweathermap.org/img/wn/${dayIconCode}@2x.png`;

          // Create data object
          setWeather({
            temp: returnedWeather.main.temp,
            wind: returnedWeather.wind.speed,
            weatherDescription: returnedWeather.weather[0].description,
            dayIconUrl,
          });
        })
        .catch((error) => {
          setNotificationInfo({
            message: `Couldn't get weather data || ${error}`,
            class: "error",
          });
          setTimeout(() => {
            setNotificationInfo(null);
          }, 5000);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryData]);

  // Too many countries in the matching list
  if (countriesMatchList.length > 10) {
    return <p>Too many matches. Be more specific.</p>;
  }

  // One country matching in the list
  if (countriesMatchList.length === 1) {
    return (
      <div>
        {/* Country info */}
        <h2>{countryData.name}</h2>
        <p>Capital: {countryData.capital}</p>
        <p>Population: {countryData.population}</p>
        <p>Languages:</p>
        <ul>{countryData.languages}</ul>
        <p>Continents:</p>
        <ul>{countryData.continents}</ul>
        <img src={countryData.flagImg} alt={countryData.flagAlt} />

        {/* Weather */}
        <CapitalWeather capital={countryData.capital} weather={weather} />
      </div>
    );
  }

  // show the list of countries
  return (
    <ul>
      {countriesMatchList.map((country) => {
        return (
          <li key={country}>
            {country}{" "}
            <button onClick={() => handleShowButton(country)}>show</button>{" "}
          </li>
        );
      })}
    </ul>
  );
};

const CapitalWeather = ({ capital, weather }) => {
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {weather.temp} &deg;C</p>
      <p>Wind: {weather.wind} m/s</p>
      <p>Sky: {weather.weatherDescription}</p>
      <img src={weather.dayIconUrl} alt={`${weather.weatherDescription}`} />
    </div>
  );
};

export default Countries;
