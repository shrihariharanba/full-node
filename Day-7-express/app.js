// const express = require('express');
// const app = express();
const app = require('express')();
const mongoose = require('mongoose');
const Schema = require('./app/schema.model');
const dbpath = "mongodb://localhost:27017/batch2";
const router = require('./app/router.controller');
const bodyParser = require('body-parser');


const mongo = mongoose.connect(dbpath, {useNewUrlParser: true });
mongo.then(() => {
  console.log('connected');
}).catch((err) => {
  console.log('err', err);
});

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));


router.routeController(app);
console.log('app');
app.listen('8009', () => {
  console.log('Sarted Server');
});