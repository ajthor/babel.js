var _ = require("lodash");
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
	}

});


