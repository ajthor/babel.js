var _ = require("lodash");
var lev = require("../levenshtein.js");
var word = require("../word/word.js");
var collection = require("../collection/collection.js");

var dict = module.exports = collection.extend({
	initialize: function() {
		this._template = word;
	},

	lookup: function(word) {
		return _.find(this.objects, function(item) {
			return item.get("word") === word;
		});
	},

	fuzzyMatch: function(args) {
		if(!(args instanceof word)) args = new word(args);
		var index = _.sortedIndex(this.objects, args, function(item) {
			return item.get("word").toLowerCase();
		});

		var result = null;
		var pdist, ndist;
		var prev = this.at(index-1);
		var next = this.at(index);

		if(prev) {
			pdist = lev(args.get("word"), prev.get("word"));
			if(pdist < 3) result = prev;
		}
		if(next) {
			ndist = lev(args.get("word"), next.get("word"));
			if((ndist < pdist) && (ndist < 3)) result = next;
		}

		if(result) console.log("Found a fuzzy match:", result.get("word"));

		return result;
	}

});


