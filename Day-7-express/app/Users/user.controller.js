const express = require('express');
const mongoose = require('mongoose');
const userModel = mongoose.model('User');
const user = require('./user.model');

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
    let token = result.generateAuthToken();
    let data = {
      token,
      ...result
    }
    res.send({data: result});
  });
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