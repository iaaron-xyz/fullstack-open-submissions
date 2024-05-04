const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");

// Get the password from the command line
console.log(process.argv);
const password = process.argv[2];

// insert the PASS in the url
const url = `mongodb+srv://iarnfso:${password}@cluster0.wslzans.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB connection parameters
mongoose.set("strictQuery", false);
mongoose.connect(url);

// Base schema for the database
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Create model called Person with the schema personSchema
const Person = mongoose.model("Person", personSchema);

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

// Process the returned object data from MongoDB to more readable UI
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // Create an extra field copying the _id field to string format
    returnedObject.id = returnedObject._id.toString();
    // delete unnecessary fields in the frontend
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

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
