const Persons = ({ persons, filterText }) => {
  // Filter persons by filterText
  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  );

  console.log(filterText);

  return (
    <>
      {filteredPerson.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};

export default Persons;
