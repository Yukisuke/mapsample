var fs = require('fs');
var express = require('express');

var app = express();
app.use(express.logger());

var buf = fs.readFileSync('./index.html');
app.get('/', function(req, res) {
    res.send(buf.toString());
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("listening on " + port);
});

