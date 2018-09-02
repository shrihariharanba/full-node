const express = require('express');
const mongoose = require('mongoose');
const userModel = mongoose.model('User');
const user = require('./user.model');


const save = (req, res) => {
  // res.send({data: 'all'});
  console.log(req.body)
  const user = new userModel({
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
    res.send(result);
  });
};
const findAll = (req, res) => {
  // res.send({data: 'all'});
  console.log('inside controller =----');
  userModel.find({},(err, result) => {
    if(err) {
      res.send({data: err});
      return;
    }
    console.log('--------------'+result);
    res.send({data: result});
  });

};


const findUser = (req, res) => {
  // res.send({data: 'all'});
  userModel.find({'email':req.params['email']}, (err, result) => {
    if(err) {
      res.send({data: err});
      return err;
    }
    console.log(result);
    res.send({data: result});
  });
};

const updateUser = (req, res) => {
  // res.send({data: 'all'});
  let userId = req.params['userid'];
  let obj={
    email:'test@Samplet.com',
    mobile:3254125676
  }
  userModel.findOneAndUpdate({'_id':userId},{$set:obj}, (err, result) => {
    if(err) {
      res.send({data: err});
      return err;
    }
    console.log(result);
    res.send({data: result});
  });
};

const deleteUser = (req, res) => {
  // res.send({data: 'all'});
  let email = 'test@Samplet.com';
  
  userModel.findOneAndRemove({'email':email}, (err, result) => {
    if(err) {
      res.send({data: err});
      return err;
    }
    console.log(result);
    res.send({data: result});
  });
};

module.exports = {
  save,
  findAll,
  findUser,
  updateUser,
  deleteUser
}