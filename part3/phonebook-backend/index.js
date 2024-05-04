const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

require("dotenv").config();
const Person = require("./models/person");

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
app.use(express.static("dist"));

// REQUESTS
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

// Get full list of people from the Mongo DB
app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
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

// Create a new phonebook entry
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
  // const person = persons.find(
  //   (p) => p.name.toLocaleLowerCase() === body.name.toLocaleLowerCase()
  // );
  // if (person) {
  //   return response.status(409).json({
  //     error: "The name already exist in the phonebook",
  //   });
  // }

  // Create new person object
  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  // Save new entry person to the Mongo DB
  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server  running on PORT: ${PORT}`);
});
