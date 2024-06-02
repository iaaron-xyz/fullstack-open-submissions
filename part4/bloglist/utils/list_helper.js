const dummy = (blogs_array) => {
  console.log(blogs_array);
  return blogs_array.length >= 0 ? 1 : 0;
  return 1;
};

console.log("return:", dummy([]));

module.exports = {
  dummy,
};
