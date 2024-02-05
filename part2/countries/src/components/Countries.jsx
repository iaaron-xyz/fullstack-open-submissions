const Countries = ({ countries }) => {
  if (countries.length > 10) {
    console.log(countries.lenght);
    return <p>Too many matches. Be more specific.</p>;
  }

  return (
    <ul>
      {countries.map((country) => {
        return <li key={country}>{country}</li>;
      })}
    </ul>
  );
};

export default Countries;
