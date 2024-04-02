const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api');
const { errors } = require('celebrate');
const mongoose = require('mongoose');

const app = express();

// Middleware that transforms the raw string of req.body into JSON
app.use(bodyParser.json());

// API routes
app.use('/api', routes());

// Handle celebrate and joi errors
app.use(errors());

mongoose.connect(
  'mongodb+srv://raymondeuginio:remon123@trymongo.nsaserq.mongodb.net/', {
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); // Exit the process if unable to connect to MongoDB
});

// Send error response to the client
app.use((error, request, response, next) =>
  response.status(error.status || 500).json({
    statusCode: error.status || 500,
    error: error.code || 'UNKNOWN_ERROR',
    description: error.description || 'Unknown error',
    message: error.message || 'An error has occurred',
  })
);

module.exports = app;
