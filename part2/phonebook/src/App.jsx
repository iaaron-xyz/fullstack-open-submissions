import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleInput = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmitName = (event) => {
    // prevent reload page
    event.preventDefault();

    // Check if name already exist
    for (const obj of persons) {
      if (obj.name.toLowerCase() === newName.toLowerCase()) {
        alert(`${newName} is already adde to phonebook`);
        return;
      }
    }

    // add new person name
    setPersons(
      persons.concat({
        name: newName,
      })
    );

    // reset previous new name
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Add a new name */}
      <form>
        <div>
          name: <input onChange={handleInput} value={newName} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmitName}>
            add
          </button>
        </div>
      </form>

      {/* Display the list of person's name */}
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
