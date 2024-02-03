import personService from "./services/persons";
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
    personService.getAll().then((personsFullList) => {
      setPersons(personsFullList);
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

  // Store new person to the backend
  const handleAddNewPerson = (event) => {
    // prevent reload page
    event.preventDefault();

    // Check if person already exist
    for (const obj of persons) {
      // user already exist
      if (obj.name.toLowerCase() === newName.toLowerCase()) {
        // number is the same
        if (obj.number === newNumber) {
          alert(`${newName} is already added to phonebook`);
          return;
        }

        // number is different
        if (
          confirm(
            `'${obj.name}' is already added to phonebook. Replace the old number with the new one?`
          )
        ) {
          // create new person object with new number
          const updatedPersonObject = { ...obj, number: newNumber };
          // update person data to the backend
          personService
            .update(obj.id, updatedPersonObject)
            .then((returnedPerson) => {
              setPersons(
                persons.map((p) => (p.id !== obj.id ? p : returnedPerson))
              );
            });
          console.log(`Number updated: ${newNumber}`);
        }
        return;
      }
    }

    // Create new person object
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    // Send new person data to the server
    personService.create(newPersonObject).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      // reset states
      setNewNumber("");
      setNewName("");
    });
  };

  // Delete a person from the server
  const handleDeleteBtnPerson = (id) => {
    // Delete confirmation
    const toDeletePerson = persons.find((p) => id === p.id);
    if (!confirm(`Confirm to delete ${toDeletePerson.name}?`)) {
      console.log("Deletion aborted");
      return;
    }

    // Filter mathching id
    personService.remove(id).then((deletedPerson) => {
      const updatedPersonList = persons.filter((p) => p.id !== id);
      setPersons(updatedPersonList);
      console.log(`Person with id: ${id} deleted`);
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
        handleButton={handleAddNewPerson}
      />

      {/* Display the list of person's name */}
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterText={filterText}
        handleDelete={handleDeleteBtnPerson}
      />
    </div>
  );
};

export default App;
