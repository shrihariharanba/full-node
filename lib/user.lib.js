const mongoose = require('mongoose');
const userModel = mongoose.model('User');


const validateUserByToken = function(token, cb) {
  userModel.findByToken(token).then((user) => {
    console.log(user);
    if(!user){
      cb('User Is Empty');
    }else{
      cb('', user);
    }    
  }).catch((e) => {
      cb(e);
  });
}

module.exports = {
  validateUserByToken
}