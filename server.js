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

app.get('/download', function(request, response){

  var file = path.resolve(__dirname, "taboca.png");
  fs.stat(file, function(err, stats) {
    if (err) {
      if (err.code === 'ENOENT') {
        // 404 Error if file not found
        return res.sendStatus(404);
      }
    res.end(err);
    }
    var range = req.headers.range;
    if (!range) {
     // 416 Wrong range
     return res.sendStatus(416);
    }
    var positions = range.replace(/bytes=/, "").split("-");
    var start = parseInt(positions[0], 10);
    var total = stats.size;
    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    var chunksize = (end - start) + 1;

    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "image/png"
    });

    var stream = fs.createReadStream(file, { start: start, end: end })
      .on("open", function() {
        stream.pipe(res);
      }).on("error", function(err) {
        res.end(err);
      });
  });

});


app.listen(8888);
