const mongoose = require("mongoose");

// Password required
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

// Command line argument must contain 5 strings
if (process.argv.length > 5) {
  console.log(
    "The arguments should be as follows: node mongo.js {PASS} {NAME} {NUMBER}"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://iarnfso:${password}@cluster0.wslzans.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// Fetch all notes
if (process.argv.length === 3) {
  console.log("Phonebook");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

// Save the new person with the given info
if (process.argv.length === 5) {
  // name and number
  const name = process.argv[3];
  const number = process.argv[4];

  // create new person object
  const note = new Person({
    name,
    number,
  });

  // save the new note
  note.save().then((result) => {
    console.log(`added ${name} with number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
