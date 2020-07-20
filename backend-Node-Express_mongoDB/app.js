const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/// cross origin hndling 
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// mongoose connection 
mongoose.connect('mongodb+srv://Manish:u5NldlSW5vLy3qjy@letstalk-nviuu.mongodb.net/Article-Data?ssl=true&authSource=admin&retryWrites=true&w=majority',
 {useNewUrlParser: true})
/// routes files 
const user = require('./routes/user');
const article = require('./routes/article');
const topic = require('./routes/topic');
const upload = require('./routes/upload');

app.use('/upload', upload)
app.use('/user', user)
app.use('/article', article)
app.use('/topic', topic)

app.listen(4000)



module.exports = app;