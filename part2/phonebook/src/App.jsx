import { useState } from "react";

const App = () => {
  // data
  const dataPersons = [
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ];

  const [persons, setPersons] = useState(dataPersons);
  const [newName, setNewName] = useState("Julia Test");
  const [newNumber, setNewNumber] = useState("33-3344-4442");

  const handleInputName = (event) => {
    setNewName(event.target.value);
  };

  const handleInputNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmitInfo = (event) => {
    // prevent reload page
    event.preventDefault();

    // Check if name already exist
    for (const obj of persons) {
      if (obj.name.toLowerCase() === newName.toLowerCase()) {
        alert(`${newName} is already adde to phonebook`);
        return;
      }
    }

    // test logs
    console.log(newName);
    console.log(newNumber);

    // add new person info
    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      })
    );
    // reset previous new name
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Add a new person */}
      <form>
        <div>
          name: <input onChange={handleInputName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleInputNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmitInfo}>
            add
          </button>
        </div>
      </form>

      {/* Display the list of person's name */}
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
