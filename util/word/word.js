var _ = require("lodash");
var model = require("../model/model.js");

var word = module.exports = model.extend({
	initialize: function(word) {
		this.set("word", word);
		this.id = _.uniqueId("w");
		this.primaryKey = "id";
	}
});


