const Search = ({ inputValue, handleSearch }) => {
  return (
    <div>
      Find countries:{" "}
      <input type="text" value={inputValue} onChange={handleSearch} />
    </div>
  );
};

export default Search;
