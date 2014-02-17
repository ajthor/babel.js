var _ = require("lodash");
var when = require("when");

var parse = require("parsejs");

//
//
//

var babel = module.exports = function babel(text) {
	var known = new dict();
	// For every ten sentences, one sentence at a time, ...
	parse(text).pattern(/(?:[^\.!\?]+[\.!\?\"\']+){0,10}/gi).sentences(function(sentence) {

		parse(sentence).words(function(item) {
			var matches;
			var exists;
			if(!(exists = known.lookup(item))) {
				item = new word(item);
				// Analyze

				// Compare this word to other similar words.
				matches = known.match(item);
				if(matches) item.compare(matches);

				// Add to list of known words.
				known.add(item);
			}

			// Categorize this word based on usage.


		});


	});

	
};

