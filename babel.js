var _ = require("lodash");
var when = require("when");

var parse = require("parse");

var dictionary = require("./util/dict/dict.js");

//
//
//

var babel = module.exports = function babel(text) {
	var known = new dictionary();

	// var suffixes = lexis(text).suffixes().significant(function(item) {
	// 	console.log(item);
	// });
	var words = parse(text).words();
	words.forEach(function(item) {
		var match;
		var exists;
		if(!(exists = known.lookup(item))) {
			console.log("Unknown word: >>", item, "<< found. Analyzing...");
			item = new word(item);
			// Analyze

			// Compare this word to other similar words.
			// Categorize this word based on usage.

			// Add to list of known words.
			// console.log(known.objects);
			known.add(item);
		}
		else {
			// console.log("found word:", exists.get("word"));
		}

	});

	
};

