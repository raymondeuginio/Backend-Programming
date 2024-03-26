const express = require('express');

const articles = require('./articles-route');
const users = require('./users-route');
const cust = require('./cust-routes');

module.exports = () => {
  const app = express.Router();

  articles(app);
  users(app);
  cust(app);

  return app;
};
