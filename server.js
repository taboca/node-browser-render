var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    screenshot = require('electron-screenshot-service');
    qs = require('querystring'),
    path = require("path");

http.createServer(function (req, res) {

  // http://www.telasocial.com:8888/renderfarm with JSON =   data={ "url": url, "uuid" : uuid})

  if (req.url == "renderfarm") {

    var POST = null;

    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                req.connection.destroy();
            }
        });
        req.on('end', function () {

            POST = qs.parse(body);

        });
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ "status": POST.uuid }));

  }
/*
    // now we continue
    //https://stackoverflow.com/questions/16180502/why-can-i-execute-code-after-res-send

    screenshot({
      url : process.argv[2],
      width : 1024,
      delay : 5000,
      height : 768
    })
    .then(function(img){

        //fs.writeFile('./out.png', img.data, function(err){
        fs.writeFile(process.argv[3], img.data, function(err){
          screenshot.close();
        });
    });

*/

  if (req.url == "download") {

    var file = path.resolve(__dirname, "dist", "image.png");
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
  }
}).listen(8888);
