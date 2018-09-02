const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blog = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Blog', blog);