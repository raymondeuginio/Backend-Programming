const express = require('express');
const { celebrate } = require('celebrate');
const { generateUsers } = require('../utils/users');
const userValidators = require('./users-validator');
const User = require('./users-mongo');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // Get list of users
  route.get('/', (request, response) => {
    const users = generateUsers();
    return response.status(200).json(users);
  });

  // Create new user
  route.post('/', celebrate(userValidators.createUser), async (request, response) => {
    try {
      const user = await User.create({
        id: request.body.id,
        username: request.body.username,
        fullname: request.body.fullname,
        created_at: new Date().toISOString(),
      });
      console.log(user);
      return response.status(200).json(user);
    } catch (error) {
      console.error('Error saving user:', error);
      return response.status(500).json({ error: 'Error saving user' });
    }
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
