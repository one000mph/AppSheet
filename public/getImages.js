/*
 * Contains client-side scripts for dynamically loading content
 * Author: Heather Seaman
 */


////// STRING MANIPULATION HELPERS //////
String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

var boldHeader = function boldHeader (header, val) {
	return "<b>" + header + "</b>: " + val + "<br>";
};

var deCamelUnderscore = function deCamelUnderscore (val) {
	return val.replace(/([A-Z])/g, ' $1') // add spaces, replace underscores
			  .replace(/([_])/g, ' ')
			  .replace(/^./, function(str){ return str.toUpperCase(); }) // capitalize first char
};


/////// Toggle Meta Data Using JQuery ///////
var showHideDiv = function showHideDiv(elId) {
	var sliderEl = "div." + elId;
	if ($(sliderEl).hasClass("open")) {
		$(sliderEl).slideUp(300).removeClass("open");
	} else {
		$(sliderEl).slideDown(300).addClass("open");
	}
};

/////// Retrieve one image by id and assign appropriate classes to elements //////
var getImage = function getImage (id, elClass, callback) {
	$.getJSON('https://appsheettest1.azurewebsites.net/sample/art/' + id,
	function (data) {
		var url = data.thumbnailUrl;
		var formattedData = "";
		// remove non-essential meta data
		var displayData = _.omit(data, ['thumbnailUrl',
										'id',
										'mm',
										'thumbnailCopyright',
										'artistId',
										'width',
										'height',
										'units',
										'depth',
										'dateText',
										'artistRole',
										'inscription']);
		// format the meta data in a readable format and sensible order
		var artAccessionNum, artist, artTitle, artMedium, artCredit,
		artYear, artAcquisition, artDims, artUrl;
		$.each(displayData, function (key, val) {
			key = deCamelUnderscore(key);
			key = key.capitalizeFirstLetter();
			switch(key) {
				case 'Accession number':
					artAccessionNum = boldHeader(key, val);
					break;
				case 'Artist':
					artist = boldHeader(key, val);
					break;
				case 'Title':
					artTitle = boldHeader(key, val);
					break;
				case 'Medium':
					artMedium = boldHeader(key, val);
					break;
				case 'Credit Line':
					artCredit = boldHeader(key, val);
					break;
				case 'Year':
					artYear = boldHeader(key, val);
					break;
				case 'Acquisition Year':
					artAcquisition = boldHeader(key, val);
					break;
				case 'Dimensions':
					artDims = boldHeader(key, val);
					break;
				case 'Url':
					artUrl = "<b>" + key + "</b>: <a href=\'" + val + "\'>View Image On Original Site</a><br>";
					break;
				default:
					console.log("received unknown meta data field", key);
			}
		});
		formattedData = formattedData.concat(artTitle,
												 artist,
												 artMedium,
												 artYear,
												 artAcquisition,
												 artDims,
												 artAccessionNum,
												 artCredit,
												 artUrl);
		// Add meta data to html container
		$('div.meta'+id).append("<p>" + formattedData + "</p>");
		// Add url to image element
		$(elClass).attr('data-original', url).css("padding", "10px");
		// callback to load image
		callback();
	});
};

// Use lazyLoad plugin to load images on scrollstop event
var loadImage = function loadImage (id) {
	getImage(id, '.lazy'+id, function () {
		$('img.lazy'+id).show().lazyload({
			event: "scrollstop",
			effect: "fadeIn",
			threshold : 500
		});
	});
};