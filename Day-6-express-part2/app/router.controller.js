const express = require('express');

const controller = require('./controllers');
const auth = require('./../middleware/auth.js');

const routes = express.Router();
module.exports.routeController = function(app) {
  console.log('router');
  routes.post('/save', (req, res) => {
    console.log('inside route save');
    controller.user.save(req, res);
  });
  routes.get('/all',auth.validate, (req, res) => {
    console.log('inside route get find all');
    controller.user.findAll(req, res);
  });

  routes.put('/user/update/:userid', (req, res) => {
    console.log('inside route get find all');
    controller.user.updateUser(req, res);
  });

  routes.delete('/user/delete/:email', (req, res) => {
    console.log('inside route get find all');
    controller.user.deleteUser(req, res);
  });

  routes.get('/user/:email', (req, res) => {
    controller.user.findUser(req, res);
  });

  app.use('/blogpost/v1', routes);
};