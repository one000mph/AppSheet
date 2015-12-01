var https = require('https');
var Promise = require('bluebird');


var retrieveImg = function retrieveImg (id) {
	https.get('https://appsheettest1.azurewebsites.net/sample/art/' + id, function (response) {
		// console.log("CODE\n", response.statusCode);
		// console.log("HEADERS:\n", response.headers);
		var imageData = '';

		response.on('data', function(d) {
			// process.stdout.write(d);
			imageData += d;
		});

		response.on('end', function () {
			console.log("IMAGE DATA: \n\n", imageData);
			return imageData;
		});
	}).on('error', function(e) {
		console.error(e);
	});
};

var getIds = function getIds (cb) {
	https.get('https://appsheettest1.azurewebsites.net/sample/art', function (response) {
		// console.log("CODE\n", response.statusCode);
		// console.log("HEADERS:\n", response.headers);
		var ids = "";
		var arrIds = [];

		response.on('data', function(d) {
			ids += d;
		});

		response.on('end', function () {
			ids = ids.replace(/[\[\]]/g, '');
			arrIds = ids.split(",");
			console.log("*** FETCHED IDS ***\n", arrIds.length);
			cb(arrIds);
		});
	}).on('error', function(e) {
		console.error(e);
	});
};

module.exports = {
	getIds: getIds,
	retrieveImg: Promise.promisify(retrieveImg)
}
