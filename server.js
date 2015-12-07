/*
 * Express server for an art gallery web page 
 * Images retrieved from tate.org.uk
 * Author: Heather Seaman
 */


var express = require('express');
var getIds = require("./images.js").getIds;

var app = express();

app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.use(express.static('public'));

var port = process.env.PORT || 8000;

// Method source: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
var shuffle = function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
	}

	return array;
};

app.get('/', function (req, res) {
	getIds(function (imageIds) {
		var imageCount = imageIds.length;
		// shuffle order before loading
		var randomIds = shuffle(imageIds);
		res.render('index', {title: 'AppSheet Art Galler', ids: randomIds});
	});
});


app.listen(port, function () {
	console.log("App running on http://localhost:" + port);
})
