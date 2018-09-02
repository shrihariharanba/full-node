const Schema = require('./../schema.model');
const userSchema = Schema.userSchema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtKey = require('../../jwt');

userSchema.pre('save', function(next) {
  console.log('save', this );
  const user = this;
  if(user.isModified('password')) {
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.generateAuthToken=function(){
  let user = this;
  let access='auth';
  let token = jwt.sign({_id:user_id.toHexString(),access},jwtKey.getToken()).toString();

  user.token.push({
    access,
    token,
    user.save();
  });
};