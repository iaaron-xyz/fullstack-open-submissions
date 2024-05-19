const express = require("express");
const app = express();

let blogs = [
  {
    id: 1,
    title: "The Title",
    author: "Mister X",
    url: "www.blogsoffood.com",
    likes: 13,
  },
  {
    id: 2,
    title: "Title II",
    author: "Mister Y",
    url: "www.cheaptravels.com",
    likes: 2,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Blog List Backend</h1>");
});

app.get("/api/blogs", (request, response) => {
  response.json(blogs);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
