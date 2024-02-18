const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Get phonebook info and date
app.get("/info", (request, response) => {
  response.send(`
    <p>
      Phonebook has info for ${persons.length} people
    </p>
    <p>
      ${new Date()}
    </p>`);
});

// Root
app.get("/", (request, response) => {
  response.send(`
    <h1>Persons API</h1></br>
    <p>
      All persons: <a href="http://localhost:3001/api/persons">/api/persons</a>
    </p>
    <p>
      Phonebook info: <a href="http://localhost:3001/info">/info</a>
    </p>`);
});

// All persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// Get one person given its id
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.statusMessage = "Person Not Found";
    response.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server  running: http://localhost:${PORT}/`);
