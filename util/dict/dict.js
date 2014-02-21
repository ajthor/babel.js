var _ = require("lodash");

var word = require("../word/word.js");
var collection = require("backbone-node").collection;

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

	display: function() {
		this.forEach(function(item) {
			console.log("Entry: ", this.item.get("word"));
		});
	}

});




