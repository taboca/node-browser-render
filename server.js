var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    qs = require('querystring'),
    webshot = require('webshot'),
    path = require("path");

var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json());

app.post('/request', function(request, response){
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back

  var webshot = require('webshot');

  webshot(request.body.url, request.body.uuid+'.png', function(err) {
    // screenshot now saved to google.png
  });

});

app.listen(8888);
