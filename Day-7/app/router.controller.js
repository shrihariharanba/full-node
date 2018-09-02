const express = require('express');

const controller = require('./controllers');
const authenticate = require('./../middlewares/auth');

const routes = express.Router();

module.exports.routeController = function(app) {
  console.log('router');
  routes.post('/save', (req, res) => {
    controller.user.save(req, res);
  });
  routes.get('/user/all', authenticate.validate, (req, res) => {
    controller.user.findAll(req, res);
  });
  routes.get('/user/:userid', (req, res) => {
    controller.user.findUser(req, res);
  });
  routes.put('/user/update/:userid', (req, res) => {
    controller.user.updateUser(req, res);
  });
  routes.delete('/user/delete/:userid', (req, res) => {
    controller.user.deleteUser(req, res);
  });
  routes.delete('/user/login', (req, res) => {
    controller.user.loginUser(req, res);
  });

  routes.post('/blog/create', authenticate.validate, (req, res) => {
    controller.blog.createBlog(req, res);
  });

  routes.delete('/blog/deleteBlog/:id', authenticate.validate, (req, res) => {
    controller.blog.deleteBlog(req, res);
  });

  routes.delete('/blog/delete/:id', authenticate.validate, (req, res) => {
    controller.blog.deleteBlog(req, res);
  });

  app.use('/blogpost/v1', routes);
};