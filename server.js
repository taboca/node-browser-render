var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    qs = require('querystring'),
    webshot = require('webshot'),
    path = require("path");

var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var mime = require('mime');

app.use(bodyParser.json());

app.post('/request', function(request, res){
  console.log(request.body);      // your JSON
  //response.send(request.body);    // echo the result back

  var webshot = require('webshot');

  var options = {
    screenSize: {
      width: 640 , height: 400
    }
    ,
    renderDelay: 3000
  };

  webshot(request.body.url, request.body.uuid+'.png', options, function(err) {
    // screenshot now saved to google.png

    var file = __dirname + '/' +  request.body.uuid+'.png' ;

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);

  });

});

//https://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express
app.get('/download', function(req, res){

  var file = __dirname + '/taboca.png';

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);

});

app.listen(8888);
