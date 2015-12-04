var express = require('express');
var getIds = require("./images.js").getIds;

var app = express();

app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.use(express.static('public'));

var port = 8000;

app.get('/', function (req, res) {
	getIds(function (imageIds) {
		var imageCount = imageIds.length;
		res.render('index', {title: 'Home', ids: imageIds});
	});
});


app.listen(port)
