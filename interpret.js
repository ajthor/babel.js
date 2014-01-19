var _ = require("lodash");

var search = require("./search.js");
var dict = require("./dict.js");
var word = require("./word.js");
var pattern = require("./pattern.js");
var collection = require("./collection.js");

var interpreter = module.exports = function(args) {

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

		// Collapse words into unique array.
		result = result.concat.apply([], result);
		result = result.filter(function(elem, pos) {
			return result.indexOf(elem) == pos;
		});

		return result;
	})(args);

	// console.log(sentences);

	// For each word, find suffixes/prefixes/clusters that match
	// other words and are prevalent.

	this.search = new search(words);

	console.log("prefixes", this.search.for.all.prefixes().significant());
	console.log("suffixes", this.search.for.all.suffixes().significant());
	// this.search.for.significant.clusters("Lorem", function(x) {console.log(x);});



};

