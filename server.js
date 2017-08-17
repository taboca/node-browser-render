var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    qs = require('querystring'),
    path = require("path");

http.createServer(function (req, res) {

  if (req.url == "/request") {

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

}).listen(8888);
