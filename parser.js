var _ = require("lodash");
var when = require("when");
var dictionary = require("./util/dict/dict.js");
var lexis = require("./util/lexis/lexis.js");

//
//
//

var parser = module.exports = function parser(text) {
	var known = new dictionary();

	var suffixes = lexis(text).suffixes().significant(function(item) {
		console.log(item);
	});
	var words = lexis(text).words();
	words.forEach(function(word) {
		var obj;
		var exists;
		if(!(exists = known.lookup(word))) {
			console.log("Unknown word: >>", word, "<< found. Analyzing...");
			// Analyze

			// Add to list of known words.
			// obj = known.create(word);
			known.fuzzyMatch(word);
			known.create(word);

		}
		else {
			console.log("found word:", exists.get("word"));
		}

	});

	
};

