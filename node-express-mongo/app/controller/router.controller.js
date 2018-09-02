const express = require('express');
const routes = express.Router();

module.exports.routeController = (app) =>{
    routes.get('/all',(req,res)=>{
        res.send({data:'all'});
    });
}