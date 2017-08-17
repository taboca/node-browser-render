var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    qs = require('querystring'),
    path = require("path");

var express = require('express')
  , app = express.createServer();

app.use(express.bodyParser());

app.post('/request', function(request, response){
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});

app.listen(8888);
