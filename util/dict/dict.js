var _ = require("lodash");
var lev = require("levenshtein");

var word = require("../word/word.js");
var collection = require("backbone-node").collection;

var parse = require("parsejs");

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

	match: function(args) {
		if(!(args instanceof word)) args = new word(args);
		if(args.get("word").length < 2) return null;
		var working = args.get("word");
		var result;
		var possible = [];

		// Find fuzzy matches which are adjacent in the dictionary.
		var index = _.sortedIndex(this.objects, args, function(item) {
			return item.get("word");
		});

		[index, index+1, index-1, index-2].forEach(function(item) {
			var distance;
			var compare = this.at(item);
			if(!compare) return;
			distance = lev(working, compare.get("word"));
			if(distance < 3) possible.push(compare);
		}, this);

		// Compare if this word is contained in others 
		// or if others are contained in this.
		this.objects.forEach(function(item) {
			var needle = working;
			var haystack = item.get("word");
			if(haystack.length < needle.length) {
				haystack = working;
				needle = item.get("word");
			}
			if(haystack.search(needle) !== -1) possible.push(item);
		});

		// Find fuzzy matches in the whole dictionary. 
		// Based on suffixes, i.e. removing prefixes.
		parse(working).suffixes(function(suffix) {
			if(suffix.length < 2) return;
			// console.log(suffix);
			var result = this.get(suffix);
			if(result) possible.push(result);
		}.bind(this));

		// args.set("possible", possible);
		// console.log("possible matches", args.get("possible"));

		return possible;
	}

});




