const mongoose = require('mongoose');
const schema = mongoose.Schema;
const blog = new Schema({
title:{type:String,required:true},
body:{type:String, required:true},
user:[{type:schema.Types.ObjectId, ref:'User'}]
});

mongoose.model('Blog',blog);