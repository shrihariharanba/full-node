// console.log('ABC');
const userSchema = require('./Users/user.model').userSchema;
const blogSchema = require('./Blogs/blog.model').blogSchema;
const mongoose = require('mongoose');

// console.log(2, userSchema);
mongoose.model('Blog', blogSchema);
mongoose.model('User', userSchema);
