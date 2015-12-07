/*
 * Helper methods for retrieving images
 * Author: Heather Seaman
 */

var https = require('https');

var getIds = function getIds (cb) {
	https.get('https://appsheettest1.azurewebsites.net/sample/art', function (response) {
		var ids = "";
		var arrIds = [];

		response.on('data', function(d) {
			ids += d;
		});

		response.on('end', function () {
			ids = ids.replace(/[\[\]]/g, '');
			arrIds = ids.split(",");
			cb(arrIds);
		});
	}).on('error', function(e) {
		console.error(e);
	});
};

module.exports = {
	getIds: getIds
}
