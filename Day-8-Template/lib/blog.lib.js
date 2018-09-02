const mongoose = require('mongoose');
const userModel = mongoose.model('User');
const blogModel = mongoose.model('Blog');


const validateOwner = function(userId, blogId, cb) {
  blogModel.findOne({'_id': userId, 'user._id': blogId}, (err, result) => {
    if(err) {
      cb(err, '');
    } else {
      cb('', result);
    }
  });
}

module.exports = {
  validateOwner
}