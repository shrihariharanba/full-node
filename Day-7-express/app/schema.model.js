const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  mobile: { type: Number, required: true },
  password: { type: String, required: true, minlength: 8 },
  blog: { type: Schema.Types.ObjectId, ref: 'Blog' }
});

const blogSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = {
  userSchema,
  blogSchema
}

mongoose.model('Blog', blogSchema);
mongoose.model('User', userSchema);

