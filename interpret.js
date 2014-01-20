var _ = require("lodash");

var search = require("./search.js");
var dict = require("./dict.js");
var word = require("./word.js");
var pattern = require("./pattern.js");
var collection = require("./collection.js");

var interpret = module.exports = function(args) {

	var sentences = (function(args) {
		return args.split(/\.\s/);
	})(args);

	var words = (function(args) {
		var i, j, result = [];
		var sentences = args.split(/\.\s/);

		_.forEach(sentences, function(value, key) {
			result[key] = value.split(/\s+/);

			for(var i = 0; i < result[key].length; i++) {
				result[key][i] = result[key][i].replace(/[^a-zA-Z\']/g, '');
			}
		});

		return result;
	})(args);

	console.log(sentences);

	// For each word, find suffixes/prefixes/clusters that match
	// other words and are prevalent.

	this.search = new search(words);

	var suffixes = this.search.for.all.suffixes();
	var significant = function(c) {
		var max = _.max(c._items, 'frequency').frequency;
		var min = _.min(c._items, 'frequency').frequency;

		console.log(max, min, (Math.log(max))*9);

		_.remove(c._items, function(item) {
			return !!(item.frequency < (Math.log(max))*9);
		});

		return c._items;
	};
	suffixes = significant(suffixes);
	console.log(suffixes);

	_.forEach(words, function(word) {
		// Do stuff. 
	});


};

