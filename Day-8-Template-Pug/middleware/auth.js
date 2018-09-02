var mongoose = require('mongoose');
var userModel = mongoose.model('User');

module.exports.setLoginUser = function(req, res, next) {
  if (req.session && req.session.user){
    req.user = user;
    delete req.user.password; 
    req.session.user = user;
    next();
  } else {
    next();
  }
}


module.exports.checkLogin = function(req,res,next){
	if(!req.user && !req.session.user){
		res.redirect('/user/login/');
	}
	else{
		next();
	}

}