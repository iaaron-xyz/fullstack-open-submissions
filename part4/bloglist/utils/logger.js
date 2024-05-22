const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

const logs = { info, error };

module.exports = logs;
