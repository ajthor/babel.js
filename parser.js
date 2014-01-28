var _ = require("lodash");
var when = require("when");
var dictionary = require("./util/dict/dict.js");
var word = require("./util/word/word.js");
var lexis = require("./util/lexis/lexis.js");

//
//
//

var parser = module.exports = function parser(text) {
	var known = new dictionary();

	// var suffixes = lexis(text).suffixes().significant(function(item) {
	// 	console.log(item);
	// });
	var words = lexis(text).words();
	words.forEach(function(item) {
		var match;
		var exists;
		if(!(exists = known.lookup(item))) {
			console.log("Unknown word: >>", item, "<< found. Analyzing...");
			item = new word(item);
			// Analyze
			match = known.closestMatch(item);
			if(match) item.compare(match);

			// Add to list of known words.
			// console.log(known.objects);
			known.add(item);
		}
		else {
			// console.log("found word:", exists.get("word"));
		}

	});

	
};

