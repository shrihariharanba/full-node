const userLib = require('./../lib/user.lib');

const validate = (req, res, next) => {
  const token = req.header('x-auth-token');
  if(!token) {
    return res.send({'data': 'user is not authenticated'});
  }
  userLib.validateUserByToken(token, (err, user) => {
    if(err) {
      res.send({'data': err});
      return;
    }
    req.user = user;
    next();
  });
};


module.exports = {
  validate
}