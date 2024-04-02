const joi = require('joi');

module.exports = {
  createUser: {
    body: {
      id: joi.number().positive().integer().required(),
      username: joi.string().min(6).max(30).required(),
      fullname: joi.string().max(100).required(),
    },
  },
};
