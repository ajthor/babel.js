var _ = require("lodash");
var when = require("when");

var parse = require("parsejs");

var word = require("./util/word/word.js");
var dict = require("./util/dict/dict.js");

//
//
//

var babel = module.exports = function babel(text) {
	var known = new dict();

	parse(text).sentences(function(sentence) {

		parse(sentence).words(function(item) {
			var possible;
			var exists;
			if(!(exists = known.lookup(item))) {
				console.log("Unknown word: >>", item, "<< found. Analyzing...");
				item = new word(item);
				// Analyze

				// Compare this word to other similar words.
				possible = known.match(item);
				if(possible) item.compare(possible);

				// Add to list of known words.
				known.add(item);
			}

			// Categorize this word based on usage.


		});

		console.log("End of sentence.");

	});

	
};

