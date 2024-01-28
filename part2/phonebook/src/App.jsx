import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

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
  const [filterText, setFilterText] = useState("");

  const handleInputName = (event) => {
    setNewName(event.target.value);
  };

  const handleInputNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterText(event.target.value);
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

      {/* Filter */}
      <Filter filterText={filterText} handleFilter={handleFilter} />

      {/* Add a new person */}
      <h2>add new</h2>
      <PersonForm
        handleName={handleInputName}
        handleNumber={handleInputNumber}
        name={newName}
        number={newNumber}
        handleButton={handleSubmitInfo}
      />

      {/* Display the list of person's name */}
      <h2>Numbers</h2>
      <Persons persons={persons} filterText={filterText} />
    </div>
  );
};

export default App;
