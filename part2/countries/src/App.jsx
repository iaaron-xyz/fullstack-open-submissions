import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Search from "./components/Search";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesMatch, setCountriesMatch] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [countryData, setCountryData] = useState({});

  // Fetch all countries data
  useEffect(() => {
    countryService.getAll().then((returnedCountries) => {
      console.log("Number of countries", returnedCountries.length);
      setCountries(returnedCountries.map((country) => country.name.common));
    });
  }, []);

  // Fetch one country data
  useEffect(() => {
    console.log("Inside  useEffect");
    if (countriesMatch.length === 1) {
      console.log("fetching country info...");
      countryService.getCountry(countriesMatch[0]).then((returnedCountry) => {
        // setCountryData(returnedCountry);
        setCountryData({
          name: returnedCountry.name.common,
          capital: returnedCountry.capital[0],
          population: returnedCountry.population.toLocaleString(),
          languages: Object.values(returnedCountry.languages).map((l) => (
            <li key={l}>{l}</li>
          )),
          flagImg: returnedCountry.flags.png,
          flagAlt: returnedCountry.flags.alt,
        });
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

      {/* search field */}
      <Search inputValue={countryName} handleSearch={handleCountrySearch} />

      {/* matching countries */}
      <Countries
        countriesMatchList={countriesMatch}
        countryData={countryData}
        handleShowButton={handleShowButton}
      />
    </>
  );
}

export default App;
