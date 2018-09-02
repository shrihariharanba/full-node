const express = require('express');
const mongoose = require('mongoose');
const blogModel = mongoose.model('Blog');

const createBlog = (req, res) => {
  let title = req.body.title;
  let body = req.body.subject;
  let user = req.user;
  const blog = new blogModel({
    title,
    body,
    user
  });
  blog.save((err, result) => {
    if(err) {
      res.send({data: err});
      return;
    }
    res.send({data: result});
  });
};

const deleteBlog = function(req,res){
let id = req.params['id'];
blogModel.findOneAndRemove({'_id':id},(err, result)=>{
  if(err) {
    res.send({data: err});
    return;
  }
  console.log(result);
  res.send({data: result});
});
};

module.exports = {
  createBlog,
  deleteBlog
}