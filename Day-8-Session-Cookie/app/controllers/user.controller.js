const mongoose = require('mongoose');
const express = require('express');
const auth = require("./../../middleware/auth");
const routes = express.Router();
const userModel = mongoose.model('User');

module.exports.userController = function(app) {
  routes.get('/all', auth.checkLogin, (req, res) => {
    userModel.find({}, (err, result) => {
      if(err){
        return res.send('No record found'+err);
      }
      res.render('users', {result})
    })
  });

  routes.get('/detail/:id', (req, res) => {
    let id = req.params['id'];
    userModel.findOne({'_id': id}, (err, result) => {
      if(err) {
        return res.send(`Some error occured ${err}`)
      }
      res.render('userdetail', {user: result});
    })
  });

  routes.get('/detail/update/:id', (req, res) => {
    let id = req.params['id'];
    userModel.findOne({'_id': id}, (err, result) => {
      if(err) {
        return res.send(`Some error occured ${err}`)
      }
      console.log(result);
      res.render('updateuser', {user: result});
    })
  });

  routes.post('/detail/update/:id', (req, res) => {
    let id = req.params['id'];
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let username = req.body.username;
    let password = req.body.pwd;
    let body = {
      fname: fname,
      lname: lname,
      email: email,
      mobile: mobile,
      username: username,
      password: password
    }
    userModel.findOneAndUpdate({'_id': id}, body, (err, result) => {
      if(err) {
        return res.send(`Some error occured ${err}`)
      }
      console.log(result);
      res.redirect('/user/all');
    })
  });


  routes.get('/login', (req, res) => {
    res.render('login');
  });

  routes.get('/signup', (req, res) => {
    res.render('signup');
  });

  routes.post('/detail/delete/:id', (req, res) => {
    let id = req.params['id'];
    console.log('In delete');
    userModel.findOneAndRemove({'_id':id}, (err, result) => {
      if (err) {
        console.log(err);
        return res.send('Someting Went wrong');
      }
      res.redirect('/user/all');
    });
  })

  routes.post('/signup', (req, res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let username = req.body.username;
    let password = req.body.pwd;
    console.log(fname, lname, email, mobile, username, password)
    let user = new userModel({
      fname: fname,
      lname: lname,
      email: email,
      mobile: mobile,
      username: username,
      password: password
    });
    user.save((err, result) => {
      if(err) {
        return res.send('some error'+err);
      }
      req.session.user = result;
      res.redirect('/tweet/v1/all');
    });
  });

  routes.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    userModel.findByCredential(email, password)
          .then((result) => {
            req.session.user = result;
            res.redirect('/tweet/v1/all');
          })
          .catch((error) => {
            res.require('/login');
          });
  });


  routes.get('/logout', auth.checkLogin, (req, res) => {
      res.clearCookie('ensembleCookie');
      res.redirect('/login'); 
  });

  app.use('/user', routes);
}