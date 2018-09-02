const express = require('express');
const mongoose = require('mongoose');
const userModel = mongoose.model('User');

const save = (req, res) => {
  console.log(req.body);
  let user = new userModel({
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password
  });
  user.save((err, result) => {
    if(err) {
      res.send({data: err});
      return;
    }
    console.log(result);
    user.generateAuthToken().then((token)=> {
      res.set({
        'Content-Type': 'text/plain',
        'Content-Length': '123',
        'ETag': '12345',
        'Access-Control-Allow-Origin': '*',
        'x-auth': token
      }).send(result);
    });
  });
  // user.createUser()
  // console.log(user.bar);
  // console.log(user.foo);
  // console.log(userModel.bar);
  // console.log(userModel.foo);
  // res.send({data: 'data'});
}
const findAll = (req, res) => {
  // res.send({data: 'all'});
  userModel.find({}, (err, result) => {
    if(err) {
      res.send({data: err});
      return;
    }
    console.log(result);
    res.send({data: result});
  })
}

const findUser = (req, res) => {
  let userId = req.params['userid'];
  userModel.findOne({'_id': userId}, (err, result) => {
    if(err) {
      res.send({data: err});
      return;
    }
    console.log(result);
    res.send({data: result});
  })
}
const updateUser = (req, res) => {
  let userId = req.params['userid'];
  let obj = {
    mobile: req.body.mobile,
    password: req.body.password
  };
  _cleanUp(obj);
  userModel.findOneAndUpdate({'_id': userId}, {$set: obj}, (err, result) => {
    if(err) {
      res.send({data: err});
      return;
    }
    console.log(result);
    res.send({data: result});
  })
}
const deleteUser = (req, res) => {
  let userId = req.params['userid'];
  userModel.findOneAndRemove({'_id': userId}, (err, result) => {
    if(err) {
      res.send({data: err});
      return;
    }
    console.log(result);
    res.send({data: result});
  })
}

const loginUser = (req, res) => {
  
}

const _cleanUp = (obj) => {
  for(let prop in obj) {
    if(obj[prop] === null || obj[prop] === undefined || obj[prop] === '') {
      delete obj[prop];
    }
  }
}


module.exports = {
  save,
  findAll,
  findUser,
  updateUser,
  deleteUser
}