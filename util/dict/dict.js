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

		// Find fuzzy matches in the whole dictionary. 
		// Based on clusters.
		parse(working).clusters(function(cluster) {
			if(cluster.length < 2) return;
			// console.log(cluster);
			var result = this.get(cluster);
			if(result) possible.push(result);
		}.bind(this));

		// args.set("possible", possible);
		console.log("possible matches", _.uniq(possible));

		return _.uniq(possible);
	}

});




