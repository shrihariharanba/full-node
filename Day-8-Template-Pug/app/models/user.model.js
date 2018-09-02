const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
  fname: {type: String, 
          required: true
          },
  lname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  mobile: {type: Number, required: false},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 6}
});

user.statics.findByCredential = function(email, password) {
  const user = this;
  return new Promise((resolve, reject) => {
    user.findOne({email}).then((result) => {
      if(!result) {
        return reject();
      }
      if (password === result.password){
        return resolve(result);
      } else {
        return reject('password doesn\'t match');
      }
    });
  });
};

mongoose.model('User', user);