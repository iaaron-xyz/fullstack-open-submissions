import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Search from "./components/Search";
import Countries from "./components/Countries";
import Notification from "./components/Notification";

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesMatch, setCountriesMatch] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [countryData, setCountryData] = useState({});
  const [notificationInfo, setNotificationInfo] = useState(null);

  // Fetch all countries data
  useEffect(() => {
    countryService
      .getAll()
      .then((returnedCountries) => {
        console.log("Number of countries", returnedCountries.length);
        setCountries(returnedCountries.map((country) => country.name.common));
      })
      .catch((error) => {
        setNotificationInfo({
          message: `Couldn't get the list of countries || ${error}`,
          class: "error",
        });
        setTimeout(() => {
          setNotificationInfo(null);
        }, 5000);
      });
  }, []);

  // Fetch one country data
  useEffect(() => {
    if (countriesMatch.length === 1) {
      console.log("fetching country info...");
      countryService
        .getCountry(countriesMatch[0])
        .then((returnedCountry) => {
          // save relevant data
          setCountryData({
            name: returnedCountry.name.common,
            capital: returnedCountry.capital[0],
            continents: returnedCountry.continents.map((c) => (
              <li key={c}>{c}</li>
            )),
            population: returnedCountry.population.toLocaleString(),
            languages: Object.values(returnedCountry.languages).map((l) => (
              <li key={l}>{l}</li>
            )),
            flagImg: returnedCountry.flags.png,
            flagAlt: returnedCountry.flags.alt,
          });
        })
        .catch((error) => {
          setNotificationInfo({
            message: `Couldn't get the data of ${countriesMatch[0]} || ${error}`,
            class: "error",
          });
          setTimeout(() => {
            setNotificationInfo(null);
          }, 5000);
        });
    }
  }, [countriesMatch]);

  // Create a list of countries that contain the input string
  const handleCountrySearch = (e) => {
    // Filter only countries that match
    const matchingCountries = countries.filter((country) =>
      country.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // update states
    setCountriesMatch(matchingCountries);
    setCountryName(e.target.value);
  };

  // Show the specified country
  const handleShowButton = (country) => {
    setCountriesMatch([country]);
  };

  return (
    <>
      <h1>Data of Countries</h1>

      <Notification notificationInfo={notificationInfo} />

      {/* search field */}
      <Search inputValue={countryName} handleSearch={handleCountrySearch} />

      {/* matching countries */}
      <Countries
        countriesMatchList={countriesMatch}
        countryData={countryData}
        handleShowButton={handleShowButton}
        setNotificationInfo={setNotificationInfo}
      />
    </>
  );
}

export default App;
