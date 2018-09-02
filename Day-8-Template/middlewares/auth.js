const userLib = require('./../lib/user.lib');
const blogLib = require('./../lib/blog.lib');

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
  })
}

const validateOwner = (req, res, next) => {
    userId = req.user._id;
    blogId = req.params['id'];
    blogLib.validateOwner(userId, blogId, (err, result) => {
      if(err) {
        res.send({'data': err});
        return;
      }
      next();
    });
}

module.exports = {
  validate
}