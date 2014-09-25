'use strict';
/*jslint unparam: true*/
var express = require('express');
var routes = require('./server/routes');
var livereload = require('connect-livereload');
//var logfmt = require('logfmt');
var app =  express();

app.use(livereload());
var port = Number(process.env.PORT || 5000);

module.exports.app = exports.app = app;

app.use(express.static(__dirname + '/app'));

app.get('/', function (req, res) {
  res.redirect('/app/index.html');
});

app.listen(port, function (err) {
  if (!err) {
    console.log('Listening at ' + port);
  }
});
routes(app);