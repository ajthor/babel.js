var _ = require("lodash");
var word = require("./word/word.js");

var pattern = module.exports = function pattern(rx) {
	if(!(this instanceof pattern)) return new pattern(rx);
	
	if(!(rx instanceof RegExp)) rx = new RegExp(rx, 'i');
	this.rx = rx;

	this.hash = this.hash(this.rx.toString());
	
};

_.assign(pattern.prototype, {

	hash: function(str) {
		if(!str) str = this.word+this.id+this.category;
		var hash = 0, i, ch;
		for (i = 0, l = str.length; i < l; i++) {
		    ch  = str.charCodeAt(i);
		    hash  = ((hash<<5)-hash)+ch;
		    hash |= 0; // Convert to 32bit integer
		}
		return hash;
	},

	exec: function(arr, cb) {
		// Get arguments.
		var args = Array.prototype.slice.call(arguments);
		if(_.isFunction(args[args.length-1])) cb = args.pop();

		var result = [];
		// Convert array to array if not already an array.
		if(args.length > 1) arr = args;
		else if(!Array.isArray(arr)) arr = [arr];

		// Cycle through array.
		arr.forEach(function(item) {
			var match, search;
			if(item instanceof word) search = item.toString();
			else search = item;
			// And find the words that match.
			if((match = this.rx.exec(search)) !== null) {
				// If you pass a complex regexp, it may be better
				// to capture all results in a callback.
				if(cb && _.isFunction(cb)) cb(match);
				// Otherwise, push the results to a results array.
				else result.push(item);
			}
		}, this);

		return result;
	},

	toString: function() {return this.rx.toString();}

});



