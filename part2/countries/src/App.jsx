import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Search from "./components/Search";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesMatch, setCountriesMatch] = useState([]);
  const [countryName, setCountryName] = useState("");

  // Fetch all countries
  useEffect(() => {
    countryService.getAll().then((returnedCountries) => {
      console.log("Number of countries", returnedCountries.length);
      setCountries(returnedCountries.map((country) => country.name.common));
    });
  }, []);

  // Create a list of countries that contain the input string
  const handleCountrySearch = (e) => {
    // Filter only countries that match
    const matchingCountries = countries.filter((country) =>
      country.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(matchingCountries);
    // update states
    setCountriesMatch(matchingCountries);
    setCountryName(e.target.value);
  };

  return (
    <>
      <h1>Data of Countries</h1>

      {/* search field */}
      <Search inputValue={countryName} handleSearch={handleCountrySearch} />

      {/* matching countries */}
      <Countries countries={countriesMatch} />
    </>
  );
}

export default App;
