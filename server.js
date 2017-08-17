var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path");

http.createServer(function (req, res) {

  if (req.url == "/request") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ "status": "pending" }));
  }
}).listen(8888);
