var _ = require("lodash");
var model = require("../model/model.js");
var lexis = require("../lexis/lexis.js");

var word = module.exports = model.extend({
	initialize: function(word) {
		this.set("word", word.toLowerCase());
		this.id = _.uniqueId("w");
		this.primaryKey = "word";
	},

	compare: function(args) {
		if(!(args instanceof word)) args = new word(args);
		var result;
		var root;
		var related = false;
		var aggregate  = [];

		aggregate = _.union([args], (args.get("related") || []));

		root = this.findRoot(aggregate);
		console.log("root", root);
		aggregate.forEach(function(item) {
			// Compare.
			if(root) item.set("root", root);
			// Find usage. If usage is the same, same category.

		}, this);

		// If this word or its forms are close, 
		// then let's make them related.
		if(related) {
			this.relateTo(args);
		}
		return result;
	},

	relateTo: function(args) {
		var related = _.union([this], [args], (this.get("related") || []), (args.get("related") || []));
		related.forEach(function(item) {
			var remaining = _.difference(related, [item]);
			item.set("related", remaining);
		}, this);
	},

	findRoot: function(args) {
		var root = "";
		var words = [this.get("word")];

		if(!Array.isArray(args)) args = [args];
		args.forEach(function(item) {
			if(!(item instanceof word)) item = new word(item);
			words.push(item.get("word"));
		});

		lexis(words).prefixes().shared(function(item) {
			if(item.length > root.length) {
				root = item;
			}
		});

		// Should be a significant length.
		if(!(root.length > 3)) {
			return null;
		}

		return root;
	}

});


