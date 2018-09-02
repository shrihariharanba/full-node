const validate = (req, res, next) => {
  const token = req.header('x-auth-token');
  if(!token) {
    return res.send({'data': 'user is not authenticated'});
  }
  next();
}

module.exports = {
  validate
}