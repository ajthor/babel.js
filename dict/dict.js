var _ = require("lodash");
var word = require("../word/word.js");
var collection = require("../collection/collection.js");

var dict = module.exports = function Dict() {
	var args = Array.prototype.slice.apply(arguments);
	args.unshift(word);
	return collection.apply(this, args);
};
dict.prototype = collection.prototype;

_.extend(dict.prototype, {

});




