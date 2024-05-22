const blogsRouter = require("express").Router();

const Blog = require("../models/blog");
const logger = require("../utils/logger");

// GET all entries
blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

// POST one entry
blogsRouter.post("/", (request, response) => {
  logger.info("BODY REQUEST:", request.body);
  const blog = new Blog(request.body);
  // create entry in the DB
  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouter;
