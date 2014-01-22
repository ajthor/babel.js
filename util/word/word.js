var _ = require("lodash");
var model = require("../model/model.js");

var word = module.exports = function Word(word) {
	var args = Array.prototype.slice.apply(arguments);
	this.set("word", word);
	this.id = _.uniqueId("w");
	this.primaryKey = "id";
	return model.apply(this, args);
};
word.prototype = model.prototype;

_.assign(word.prototype, {

	iterator: function(word) {},
	iterate: function(cb) {
		var word = this.get("word");
		for(var i = 0, len = word.length; i < len; i++) {
			cb(word);
			word = iterator(word);
		}
	}

});




