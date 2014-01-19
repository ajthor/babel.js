var _ = require("lodash");
var collection = require("./collection.js");
var pattern = require("./pattern.js");

var removeFirstLetter = function(word) {return word.substr(1);};
var removeLastLetter = function(word) {return word.slice(0, -1);};

var search = module.exports = function(args, options) {
	if(!(this instanceof search)) return new search(args);
	options || (options = {});

	if(!Array.isArray(args)) args = [args];
	this.working = args;

	_.forIn(this, function(method, key) {
		if(_.isFunction(method)) {

			//
			// all
			//
			this.all[key] = function(cb) {
				// Function that wraps other functions.
				var result = new collection();
				var args = arguments;

				_.forEach(this.working, function(value) {
					var a = Array.prototype.slice.call(args);
					a.unshift(value);
					var ret = method.apply(this, a);

					// result.add(ret);
					// Array.prototype.splice.apply(result, [0, 0].concat(ret));

				}, this);

				return result;

			}.bind(this);

		}
	}, this);

	this.for = _.omit(this, 'for');

};

_.assign(search.prototype, {

	all: {},

	// matches: function(args, cb) {
	// 	var p = new pattern(args);
	// 	var result = [];

	// 	p.exec(this.working, function(match) {
	// 		result.push(match[0]);
	// 		if(cb) cb(match);
	// 	});

	// 	return result;
	// },

	prefixes: function(args, cb) {
		var result = new collection();
		var remaining = _.difference(this.working, [args]);

		_.forEach(remaining, function(word) {
			if(args === word) return;
			var compare = args;

			for(var i = 1; i < args.length-1; i++) {
				compare = removeLastLetter(compare);
				if(compare === word.slice(0, compare.length)) {
					// result.add(compare);
					if(cb) cb(compare, word);
				}
			}
		});

		return result;

	},

	suffixes: function(args, cb) {
		var result = new collection();
		var remaining = _.difference(this.working, [args]);

		_.forEach(remaining, function(word) {
			if(args.toLowerCase() === word.toLowerCase()) return;
			var compare = args;

			for(var i = 1; i < args.length-1; i++) {
				compare = removeFirstLetter(compare);
				if(compare === word.slice(-compare.length)) {
					// result.add(compare);
					if(cb) cb(compare, word);
				}
			}
		});

		return result;

	},

	clusters: function(args, cb) {
		/*
		 * Searches like so:
		 * forward | backward
		 * --------+---------
		 *    home | hom - ho - h
		 *     ome | om - o
		 *      me | m
		 *       e | 
		 *
		 * i.e. It takes the word, and removes the last letter until 0.
		 * Then, it removes the first letter and repeats. This gives
		 * every possible letter combination a try.
		 */
		var result = new collection();
		var remaining = _.difference(this.working, [args]);

		_.forEach(remaining, function(word) {
			if(args.toLowerCase() === word.toLowerCase()) return;
			var i, j, rx, forward = args, backward;

			for(i = 0; i < args.length; i++) {
				backward = forward;

				for(j = 0; j < forward.length-1; j++) {
					rx = new RegExp(backward, 'i');
					if(word.search(rx) !== -1) {
						// result.add(backward);
						if(cb) cb(backward, word);
					}

					backward = removeLastLetter(backward);
				}

				forward = removeFirstLetter(forward);
			}
		});

		return result;

	}

});




