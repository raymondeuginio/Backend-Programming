const express = require('express');
const { celebrate } = require('celebrate');
const custValidators = require('./cust-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/cust', route);

  const custList = [];
  route.get('/', (request, response) => {
    if (custList.length === 0) {
      response.status(404).json({ message: 'Belom ada data customer' });
    } else {
      return response.status(200).json(custList);
    }
  });

  // Create new cust
  route.post('/', celebrate(custValidators.createCust), (request, response) => {
    const cust = {
      cName: request.body.cName,
      email: request.body.email,
      address: request.body.address,
      year: request.body.year,
      cc: request.body.cc || null
    };
    custList.push(cust);
    return response.status(200).json(cust);
  });

  // Get user detail
  route.get('/:id', (request, response) => {
    const custId = request.params.id;
    const cust = custList.find(cust => cust.id.toString() === custId.toString());
    if (cust) {
      response.json(cust);
    } else {
      response.status(404).json({ message: 'Belom ada customer dengan id ' + custId });
    }
  });
};
