var express = require('express');
var Promise = require("bluebird");
var ids = require("./index.js");

var app = express();

app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.use(express.static('public'));

var port = 8000;

app.get('/', function (req, res) {
	ids.getIds(function (imageIds) {
		var imageCount = imageIds.length;
		// console.log('called then', imageIds);
		console.log('IMAGE IDS:\n', imageCount);
		res.render('index', {title: 'Home', ids: imageIds});
	});
});


app.listen(port)
