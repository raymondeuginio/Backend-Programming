const express = require('express');
const { celebrate } = require('celebrate');
const { generateUsers } = require('../utils/users');
const userValidators = require('./users-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // Get list of users
  route.get('/', (request, response) => {
    const users = generateUsers();
    return response.status(200).json(users);
  });

  // Create new user
  route.post('/', celebrate(userValidators.createUser), (request, response) => {
    const user = {
      id: request.body.id,
      username: request.body.username,
      fullname: request.body.fullname,
      created_at: new Date().toISOString(),
    };
    return response.status(200).json(user);
  });

  // Get user detail
  route.get('/:id', (request, response) => {
    const users = generateUsers();

    // Find the id
    const id = request.params.id;
    for (const user of users) {
      if (user.id === id) {
        return response.status(200).json(user);
      }
    }

    // User not found
    throw new Error('User not found');
  });
};
