const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  mobile: { type: Number, required: true },
  password: { type: String, required: true, minlength: 8 },
  tokens: [{
    access:{
      type: String,
      required: true
    },
    token:{
      type: String,
      required: true
    }
  }],
  blog: { type: Schema.Types.ObjectId, ref: 'Blog' }
});

const blogSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});


// userSchema.methods.foo = function() {
//   console.log('foo');
// }

// userSchema.statics.bar = function() {
//   console.log('bar');
// }

// module.exports.userSchema = userSchema;

// module.exports.blogSchema = blogSchema;

module.exports = {
  userSchema,
  blogSchema
}

// module.exports.foo = function() {
//   console.log(userSchema.statics);
//   return userSchema.methods;
// }

// mongoose.model('Blog', blogSchema);
// mongoose.model('User', userSchema);

