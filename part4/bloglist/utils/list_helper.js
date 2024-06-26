const blogs_list = require("./blogs_for_test");

const dummy = (blogs_array) => {
  return blogs_array.length >= 0 ? 1 : 0;
};

// Total sum of likes
const totalLikes = (blogs) => {
  const reducer = (total, currentItem) => {
    return total + currentItem.likes;
  };
  return blogs.reduce(reducer, 0);
};

// Blog with more likes
const favoriteBlog = (blogs) => {
  // empty list of blogs
  if (blogs.length === 0) {
    return null;
  }

  // Get the blog with the most likes
  let maxNumberOfLikes = -1;
  let favoriteBlog = {};
  blogs.forEach((element) => {
    // check the current max number of likes
    if (element.likes > maxNumberOfLikes) {
      maxNumberOfLikes = element.likes;
      favoriteBlog = {
        title: element.title,
        author: element.author,
        likes: element.likes,
      };
    }
  });

  return favoriteBlog;
};

// Most blogs
const mostBlogs = (blogs) => {
  // empty list of blogs
  if (blogs.length === 0) {
    return null;
  }

  // Get the number of blogs by author
  const blogsByAuthor = {};
  for (const blog of blogs) {
    blogsByAuthor[blog["author"]] = (blogsByAuthor[blog["author"]] || 0) + 1;
  }

  // Get the max number of blogs and its author name
  const maxBlogs = Math.max(...Object.values(blogsByAuthor));
  const authorWithMaxBlogs = Object.keys(blogsByAuthor).find(
    (key) => blogsByAuthor[key] === maxBlogs
  );

  // Return equested format
  return {
    author: authorWithMaxBlogs,
    blogs: maxBlogs,
  };
};

// Most Likes
const mostLikes = (blogs) => {
  // Empty blogs
  if (blogs.length === 0) return null;

  // Get the number of likes by author
  const likesByAuthor = {};
  for (const blog of blogs) {
    likesByAuthor[blog["author"]] =
      (likesByAuthor[blog["author"]] || 0) + blog["likes"];
  }

  // Get the author's name with max number of likes
  const maxLikes = Math.max(...Object.values(likesByAuthor));
  // get the max number of likes
  const authorWithMaxLikes = Object.keys(likesByAuthor).find(
    (key) => likesByAuthor[key] === maxLikes
  );

  // Return in the requested format
  return {
    author: authorWithMaxLikes,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
