
const express=require('express');
const app=express();
const path = require("path")
const connect = require('./db')
const bodyParser = require('body-parser')
const controls = require('./controls')
const ejs = require('ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/',controls)
app.use(express.static(path.join(__dirname, '/src/public'))); 
const mongoose = require('mongoose'); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine' , 'ejs')

//renderViews()
connect.connect()
//routers(app)

const post=5555
app.listen(post,()=>{
    console.log('app opped at port http://localhost:'+post)
})    