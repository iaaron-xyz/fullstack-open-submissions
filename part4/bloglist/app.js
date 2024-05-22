require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const Blog = require("./models/blog");
const logger = require("./utils/logger");
const config = require("./utils/config");

const mongoUrl = config.MONGODB_URI;

mongoose.connect(mongoUrl);

// Middlewares before routes
app.use(cors());
app.use(express.json());

// Get full list of blogs
app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  logger.info("BODY REQUEST:", request.body);
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = app;
