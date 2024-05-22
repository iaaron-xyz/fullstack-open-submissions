const config = require("./utils/config");

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");

// get the DB URI
const mongoUrl = config.MONGODB_URI;

// CONNECT to the DB
mongoose.connect(mongoUrl);

// MIDDLEWARES before routes
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/blogs", blogsRouter);

module.exports = app;
