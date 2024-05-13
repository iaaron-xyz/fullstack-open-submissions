const mongoose = require("mongoose");

// mongo connection parameters
mongoose.set("strictQuery", false);

// Get the URL from a dotenv file
const url = process.env.MONGODB_URI;

// Give feedback
console.log("Connecting to", url);

// Connect the the given URL and give feedback
mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

// define the base schema for the database
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name field must be 3 characters long minimum."],
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{6,}/.test(v); // XX-XXXX... or XXX-XXXX...
      },
      message: (props) =>
        `${props.value} is not a valid phone number. Try the format: 000-1234567.`,
    },
  },
});

// Process the returned object data from MongoDB to more readable UI
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // Create an extra field copying the _id field to string format
    returnedObject.id = returnedObject._id.toString();
    // delete unnecessary fields in the frontend
    delete returnedObject._id;
    delete returnedObject.__v;
    // object form
    console.log("Formatted object:", returnedObject);
  },
});

module.exports = mongoose.model("Person", personSchema);
