const express = require('express');
const auth = require('../src/routes/userRoutes');
const errorHandling = require('../src/middleware/errorHandlingMiddleware');
 
module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(auth);
  app.use(errorHandling);
};
