module.exports.validate = (req,res,next)=>{
const token = req.header('auth-token');
if(!token){
return res.send({'data':'Error no token'});
}
next();
};