const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(logger('dev'));
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

app.set('view engine', 'pug');
app.set('views',path.join(__dirname + '/app/views'));
app.use(cookieParser());
app.use(session({
	name: 'ensembleCookie',
	secret: 'ensembleSecret',
	resave: true,
	httpOnly: true,
	saveUninitialize: true,
	cookie: {secure: false}
}));
app.use((req, res, next) => {
	if (req.cookies.ensembleCookie && !req.session.user){
		res.clearCookie('ensembleCookie');
	} 
	next()
});

const dbpath = "mongodb://localhost/sample"
mongoose.connect(dbpath, () => {
  console.log('connected to db');
});

mongoose.connection.once('open', function(){
	console.log("database open");
});



app.get('/', (req, res) => {
  res.send('Hello World');
});



const userModel = require('./app/models/user.model');
const tweetModel = require('./app/models/tweet.model');
const commentModel = require('./app/models/comment.model');
const userController = require('./app/controllers/user.controller');
const tweetController = require('./app/controllers/tweet.controller');
userController.userController(app);
tweetController.tweetController(app);

app.listen('3002', () => {
  console.log('Server started on port 3002');
});