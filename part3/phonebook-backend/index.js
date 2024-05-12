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

// Error handler
const errorHandler = (error, request, response, next) => {
  // print error message
  console.log(error);

  // Errors related to casting
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
    // Error vlidation
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

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
  //  Get the total number of entries
  Person.countDocuments({})
    .then((count) => {
      console.log("Total number of entries:", count);
      response.send(`
      <p>
        Phonebook has info for ${count} people
      </p>
      <p>
        ${new Date()}
      </p>`);
    })
    .catch((err) => {
      console.error("Error counting total entries:", err);
      return response.status(404).end();
    });
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

// GET one person info from the DB
app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      // null retrieve
      if (person === null) {
        return response.status(404).end();
      }
      // otherwise respond with the person's info
      console.log(person);
      response.json(person);
    })
    .catch((error) => next(error));
});

// Create a new phonebook entry
app.post("/api/persons", (request, response, next) => {
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

  // Create new person object
  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  // Save new entry person to the Mongo DB
  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

// DELETE a person from the DB
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  Person.findByIdAndDelete(id)
    .then((results) => {
      console.log(results);
      response.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "the id is malformatted" });
    });
});

// UPDATE a person entry with a new number
app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  // Info from the Frontend
  const newPersonInfo = {
    name: body.name,
    number: body.number,
  };

  console.log("NEW NUMBER:", newPersonInfo);

  // update to the DB
  Person.findByIdAndUpdate(id, newPersonInfo, { new: true })
    .then((updatedPerson) => {
      console.log("Updating person:", newPersonInfo.name);
      response.json(updatedPerson);
    })
    .then(() => {
      console.log("Updated successfully");
    })
    .catch((error) => next(error));
});

// MIDDLEWARES TO LOAD LAST
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server  running on PORT: ${PORT}`);
});
