var https = require('https');

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
	getIds: getIds
}
