var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    screenshot = require('electron-screenshot-service'),
    qs = require('querystring'),
    path = require("path");

var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json());

app.post('/request', function(request, response){
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
  response.send(200);

  screenshot({
    url : request.body.url,
    width : 1024,
    delay : 5000,
    height : 768
  })
  .then(function(img){

      //fs.writeFile('./out.png', img.data, function(err){
      fs.writeFile(request.body.uuid+'.png', img.data, function(err){
        screenshot.close();
      });
  });


});

app.listen(8888);
