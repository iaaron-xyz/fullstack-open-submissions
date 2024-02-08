const Countries = ({ countriesMatchList, countryData, handleShowButton }) => {
  if (countriesMatchList.length > 10) {
    return <p>Too many matches. Be more specific.</p>;
  }

  if (countriesMatchList.length === 1) {
    return (
      <div>
        <h2>{countryData.name}</h2>
        <p>Capital: {countryData.capital}</p>
        <p>Population: {countryData.population}</p>
        <p>Languages:</p>
        <ul>{countryData.languages}</ul>
        <img src={countryData.flagImg} alt={countryData.flagAlt} />
      </div>
    );
  }

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

export default Countries;
