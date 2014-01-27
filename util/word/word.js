var _ = require("lodash");
var model = require("../model/model.js");
var lexis = require("../lexis/lexis.js");

var word = module.exports = model.extend({
	initialize: function(word) {
		this.set("word", word);
		this.id = _.uniqueId("w");
		this.primaryKey = "word";
	},

	compare: function(args) {
		if(!(args instanceof word)) args = new word(args);
		var result;
		var root;
		var related = false;
		var aggregate  = [];

		aggregate = _.union([this], [args], (args.get("related") || []));
		root = this.findSharedRoot(aggregate);
		aggregate.forEach(function(item) {
			// Compare.
			item.set("root", root);
			// Find usage. If usage is the same, same category.

		}, this);

		// If this word or its forms are close, 
		// then let's make them related.
		if(related) this.relateTo(args);
		return result;
	},

	relateTo: function(args) {
		var related = _.union([this], [args], (this.get("related") || []), (args.get("related") || []));
		related.forEach(function(item) {
			var remaining = _.difference(related, [item]);
			item.set("related", remaining);
		}, this);
	},

	findSharedRoot: function(args) {
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

		console.log("root", root);
		return root;
	},

	sharedRoot: function(args) {
		var match, possible = [];

		if((this.get("word").search(args.get("word"))) !== -1) {
			// Found a root.
			console.log("Found a root!");
			this.addRelation(args);
			return;
		}

		var suffixes = lexis([args.get("word")]).suffixes();
		
		suffixes.significant(function(item) {
			var match = args.get("word").toLowerCase().slice(0, args.get("word").length-item.length);
			if(this.get("word").search(match) !== -1) {
				possible.push(match);
				console.log("possible match", this.get("word"), args.get("word"), match, args.get("word").length-item.length);
			}

		}.bind(this));

		console.log("possible roots", possible, args.get("word"));

		if(this.get("related") !== undefined) {

		}
		
	}
});


