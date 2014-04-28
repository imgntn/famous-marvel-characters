var express = require('express');
var compress = require('compression')
var errorHandler = require('errorhandler')
var app = express();
app.use(errorHandler);
app.use(compress())
app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 5000);
