const blogs_list = require("./blogs_for_test");

const dummy = (blogs_array) => {
  return blogs_array.length >= 0 ? 1 : 0;
};

const totalLikes = (blogs) => {
  const reducer = (total, currentItem) => {
    return total + currentItem.likes;
  };
  return blogs.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
