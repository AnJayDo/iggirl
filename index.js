const express = require('express')
const bodyParser = require('body-parser')

// const https = require('https');
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//   cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
// };

const port = process.env.PORT || 3000

const app = express()

const adminRouter = require('./adminRouter')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//const domain="http://iggirl.tk"

app.use(express.static('public'))


app.get('/', function(req,res){
    res.render('public/index')
})

app.get('/home', function(req,res){
    res.redirect('/')
})

app.get('/aboutpage', function(req,res){
    res.redirect('https://github.com/JasonAnger/iggirl')
})

app.get('/aboutus', function(req,res){
    res.redirect('https://www.facebook.com/dovanminhan')
})

app.use('/admin', adminRouter)

app.listen(port, function() {
    console.log('Listening on port',port)
})

// https.createServer(options, app).listen(80);