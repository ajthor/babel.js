var _ = require("lodash");
var lev = require("../levenshtein.js");
var word = require("../word/word.js");
var collection = require("../collection/collection.js");
var lexis = require("../lexis/lexis.js");

var dict = module.exports = collection.extend({
	initialize: function() {
		this._template = word;
	},

	lookup: function(args) {
		if(!(args instanceof word)) args = new word(args);
		return _.find(this.objects, function(item) {
			return item.get("word") === args.get("word");
		});
	},

	fuzzyMatch: function(args) {
		if(!(args instanceof word)) args = new word(args);
		var index = _.sortedIndex(this.objects, args, function(item) {
			return item.get("word");
		});

		var result = null;
		var pdist, ndist;
		var prev = this.at(index-1);
		var next = this.at(index);

		if(prev) {
			pdist = lev(args.get("word"), prev.get("word"));
			// console.log(prev.get("word"), pdist);
			if(pdist < 3) result = prev;
		}
		if(next) {
			ndist = lev(args.get("word"), next.get("word"));
			// console.log(next.get("word"), pdist);
			if((ndist < pdist) && (ndist < 4)) result = next;
		}

		// if(result) console.log("Found a fuzzy match:", result.get("word"));

		return result;
	},

	closestMatch: function(args) {
		if(!(args instanceof word)) args = new word(args);
		var index;
		var result = null;
		var possible = [];

		// Fuzzy match this word. 
		var result = this.fuzzyMatch(args);

		// Find words contained in this one we already know.
		this.forEach(function(item) {
			if((index = args.get("word").search(item.get("word"))) !== -1) {
				possible.push(item);
			}
		});

		var dist = function(item1, item2) {
			var levdist = lev(item1.get("word"), item2.get("word"));
			var lendist = item1.get("word").length - item2.get("word").length;
			return Math.min(levdist, lendist);
		};

		if(result) possible = _.union(possible, [result]);
		if(possible.length > 0) {
			possible.forEach(function(item) {
				// If the distance between the current result is greater
				// than the distance between this item, change result.
				if(!result) result = item;
				else if(dist(result, args) > dist(item, args)) result = item;
			});
		}

		if(result) console.log("Possible match:", result.get("word"));

		return result;
	}

});









