const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    mobile:{type:Number,required:true},
    password:{type:String,required:true,minlength:8}
    });

const blogSchema = new Schema({
    title:{type:String,required:true},
    body:{type:String, required:true},
    user:[{type:schema.Types.ObjectId, ref:'User'}]
    });

    mongoose.model('Blog',blog);

    mongoose.model('User',user);

    module.exports = {
        userSchema,
        blogSchema
    }