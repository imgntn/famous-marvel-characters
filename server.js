var express = require('express');
var compress = require('compression')
var app = express();
app.use(compress())
app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 5000);
