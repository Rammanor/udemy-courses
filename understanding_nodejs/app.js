var path = require('path');
var mongoose = require('mongoose');
var express = require('express');
var app = express();

var Controllers = require('./controllers');

var config = require('./config');

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/templates'));

app.use('/', express.static(path.join(__dirname, 'public')));

mongoose.connect(config.DB.URL).catch((error) => {
  console.log('Failed to connect to DB server: ', error);
});

// App root
app.get('/', function(req, res) {
  res.render('index');
});

// Setting up Controllers
for (key in Controllers) {
  Controllers[key](app);
}

app.listen(port);