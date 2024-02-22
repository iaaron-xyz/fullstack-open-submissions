const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

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
const genId = (idLength = 20) => {
  let id = "";
  for (let i = 0; i < idLength; i += 1) {
    id += getRandChar();
  }
  return id;
};

// DEFINE MIDDLEWARE FUNCTIONS & PARAMETERS
// define content body token for morgan logging
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

// CALL MIDDLEWARES
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());

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
      All persons: /api/persons
    </p>
    <p>
      Phonebook info: /info
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

  // Deal with empty names
  if (!body.name) {
    return response.status(400).json({
      error: "Missing name",
    });
  }

  // Deal with missing numbers
  if (!body.number) {
    return response.status(400).json({
      error: "Missing number",
    });
  }

  // Deal with repeated names
  const person = persons.find(
    (p) => p.name.toLocaleLowerCase() === body.name.toLocaleLowerCase()
  );
  if (person) {
    return response.status(409).json({
      error: "The name already exist in the phonebook",
    });
  }

  // Create new person object
  const newPerson = {
    id: genId(),
    name: body.name,
    number: body.number,
  };

  // Add new person to phonebook list
  persons = persons.concat(newPerson);

  response.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server  running on PORT: ${PORT}`);
});
