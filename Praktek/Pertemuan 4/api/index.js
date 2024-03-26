const express = require('express');

const articles = require('./articles-route');
const users = require('./users-route');

module.exports = () => {
  const app = express.Router();

  articles(app);
  users(app);

  return app;
};
