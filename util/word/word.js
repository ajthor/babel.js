var _ = require("lodash");
var model = require("backbone-node").model;

var word = module.exports = model.extend({
	initialize: function(word) {
		this.set("word", word.toLowerCase());
		this.id = _.uniqueId("w");
		this.primaryKey = "word";
	}

});


