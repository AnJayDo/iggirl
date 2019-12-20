const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express()

const adminRouter = require('./adminRouter')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const domain="http://iggirl.tk"

app.use(express.static('public'))


app.get('/', function(req,res){
    res.render('public/index')
})

app.get('/home', function(req,res){
    res.redirect('/')
})

app.get('/aboutpage', function(req,res){
    res.send('About Page')
})

app.get('/aboutus', function(req,res){
    res.send('About Us')
})

app.get('/contact', function(req,res){
    res.send('Contact')
})

app.listen(process.env.PORT, function(){
    console.log('Server listening on port '+process.env.PORT)
})

app.use('/admin', adminRouter)