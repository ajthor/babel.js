var _ = require("lodash");
var model = require("../model/model.js");
var word = require("../word/word.js");

var pattern = module.exports = function Pattern(rx) {
	var args = Array.prototype.slice.apply(arguments);

	if(!(rx instanceof RegExp)) rx = new RegExp(rx, 'i');
	this.set("rx", rx);
	
	this.id = _.uniqueId("p");
	this.primaryKey = "id";
	return model.apply(this, args);
};
pattern.prototype = model.prototype;

_.assign(pattern.prototype, {

	exec: function(arr, cb) {
		// Get arguments.
		var args = Array.prototype.slice.call(arguments);
		if(_.isFunction(args[args.length-1])) cb = args.pop();

		var result = [];
		var rx = this.get("rx");
		// Convert array to array if not already an array.
		if(args.length > 1) arr = args;
		else if(!Array.isArray(arr)) arr = [arr];

		// Cycle through array.
		arr.forEach(function(item) {
			var match, search;
			if(item instanceof word) search = item.get("word");
			else search = item;
			// And find the words that match.
			if((match = rx.exec(search)) !== null) {
				// If you pass a complex regexp, it may be better
				// to capture all results in a callback.
				if(cb && _.isFunction(cb)) cb(match);
				// Otherwise, push the results to a results array.
				else result.push(item);
			}
		}, this);

		return result;
	}

});



