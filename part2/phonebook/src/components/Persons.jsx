const Persons = ({ persons, filterText, handleDelete }) => {
  // Filter persons by filterText
  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      {filteredPerson.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          {/* Delete button */}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
