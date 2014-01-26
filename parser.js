var _ = require("lodash");
var dictionary = require("./util/dict/dict.js");
var lexis = require("./util/lexis/lexis.js");

//
//
//

var parser = module.exports = function parser(text) {
	var known = new dictionary();
	var words = lexis(text).words();
	words.forEach(function(word) {
		var exists;
		if(!(exists = known.lookup(word))) {
			console.log("Unknown word:", word, "found. Analyzing...");
			// Analyze

			console.log("Adding word to known words.");
			console.log(word, known.create(word).attributes);

			// console.log("lookup", known.lookup(word));
		}
		else {
			console.log("found word:", exists.get("word"));
		}

	});

	
};

