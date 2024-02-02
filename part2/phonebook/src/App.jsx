import axios from "axios";
import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("John Von Newmann");
  const [newNumber, setNewNumber] = useState("33-3344-4442");
  const [filterText, setFilterText] = useState("");

  // fetch initial data
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  // function handlers
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

    // Create new person object
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    // Send new person data to the server
    axios
      .post("http://localhost:3001/persons", newPersonObject)
      .then((response) => {
        setPersons(persons.concat(response.data));
        // reset states
        setNewNumber("");
        setNewName("");
      });
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
