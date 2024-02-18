const express = require("express");
const app = express();

app.use(express.json());

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

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

// Get a random integer between 0 and top, top exclusive
const getRandomInt = (top) => {
  const topFloored = Math.floor(top);
  return Math.floor(Math.random() * topFloored);
};

// get a random character from the chars string
const getRandChar = () => {
  return chars.charAt(getRandomInt(chars.length));
};

// generate a string with 20 random characters
const genId = () => {
  let id = "";
  let idLength = 20;
  for (let i = 0; i < 20; i += 1) {
    id += getRandChar();
  }
  return id;
};

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

// Delete a phonebook entry
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  // number of persons before filtering
  const numPersonsBefore = persons.length;
  // filter given entry
  persons = persons.filter((p) => p.id !== id);

  // entry not found
  if (numPersonsBefore === persons.length) {
    return response.status(400).end();
  }
  // entry deleted
  response.status(204).end();
});

// Post a new phonebook entry
app.post("/api/persons", (request, response) => {
  // Get the post body
  const body = request.body;
  console.log(body);

  // Deal with empty names
  if (!body.name) {
    return response.status(400).json({
      error: "Missing name",
    });
  }

  console.log("Random ID:", genId());

  // Create new person object
  const newPerson = {
    id: genId(),
    name: body.name,
    number: body.number,
  };

  // Add new person to phonebook list
  persons = persons.concat(newPerson);

  console.log("Persons list updated", persons);
  response.json(newPerson);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server  running: http://localhost:${PORT}/`);
