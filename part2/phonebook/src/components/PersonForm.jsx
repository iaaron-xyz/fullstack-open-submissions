const PersonForm = ({
  handleName,
  handleNumber,
  name,
  number,
  handleButton,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={handleName} value={name} />
      </div>
      <div>
        number: <input onChange={handleNumber} value={number} />
      </div>
      <div>
        <button type="submit" onClick={handleButton}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
