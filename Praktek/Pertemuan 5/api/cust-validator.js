const Joi = require('joi');

module.exports = {
  createCust: {
    body: {
      cName: Joi.string().min(3).max(50).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      address: Joi.string().max(255).required(),
      year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
      cc: Joi.string().allow(null).optional(),
    },
  },
};


