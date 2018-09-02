const express = require('express');
const app=express();
const mongoose = require('mongoose');
const dbpath = 'mongodb://localhost:27017/node-mongo';

const mongo = mongoose.connect(dbpath,{useNewUrlParser:true});
mongo.then(()=>{
console.log('DBConnected -------Hello');
}).catch((err)=>{
    console.log('DBConnected -------'+err);
});

mongoose.connect(dbpath,(err,data)=>{
//console.log(err,data);
console.log('DB connected');
});

app.get("/",(req,res)=>{
    res.send('Hello World');
});

app.get("/test",(req,res)=>{
    res.status(409).send({
        data:'Hello World Test'
    });
    
});

app.listen('8000',()=>{
    console.log('server started');
});