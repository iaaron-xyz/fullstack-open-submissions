const Filter = ({ filterText, handleFilter }) => {
  return (
    <div>
      filter shown with <input onChange={handleFilter} value={filterText} />
    </div>
  );
};

export default Filter;
