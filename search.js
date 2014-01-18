var _ = require("lodash");

var search = module.exports = function(args) {
	if(!(this instanceof search)) return new search(args);

	if(!Array.isArray(args)) args = [args];
	this.working = args;

	_.forIn(this, function(method, key) {
		if(_.isFunction(method)) {

			this.all[key] = function(cb) {
				// Function that wraps other functions.
				var result = [];
				var args = arguments;

				_.forEach(this.working, function(value) {
					var a = Array.prototype.slice.call(args);
					a.unshift(value);
					var ret = method.apply(this, a);

					// result.push(ret);
					Array.prototype.splice.apply(result, [0, 0].concat(ret));

				}, this);

				return result;

			}.bind(this);

		}
	}, this);

	this.for = _.omit(this, 'for');

};

_.assign(search.prototype, {

	all: {},

	prefixes: function(args, cb) {
		var result = [];
		var remaining = _.difference(this.working, [args]);
		// var len = args.length-1;

		// for(i = 1; i < len; i++) {
		// 	args = removeLastLetter(args);
		// 	_.forEach(remaining, function(value) {
		// 		if(args === value.slice(0, args.length)) {
		// 			result.push(args);
		// 			if(cb) cb(args, value);
		// 		}
		// 	});
		// }

		_.forEach(remaining, function(word) {
			if(args === word) return;
			var compare = args;

			for(var i = 1; i < args.length-1; i++) {
				compare = removeLastLetter(compare);
				if(compare === word.slice(0, compare.length)) {
					result.push(compare);
					if(cb) cb(compare, word);
				}
			}
		});

		return result;

	},
	suffixes: function(args, cb) {
		var result = [];
		var remaining = _.difference(this.working, [args]);
		// var i, len = args.length-1;

		// for(i = 1; i < len; i++) {
		// 	args = removeFirstLetter(args);
		// 	_.forEach(remaining, function(value) {
		// 		if(args === value.slice(-args.length)) {
		// 			result.push(args);
		// 			if(cb) cb(args, value);
		// 		}
		// 	});
		// }

		_.forEach(remaining, function(word) {
			if(args.toLowerCase() === word.toLowerCase()) return;
			var compare = args;

			for(var i = 1; i < args.length-1; i++) {
				compare = removeFirstLetter(compare);
				if(compare === word.slice(-compare.length)) {
					result.push(compare);
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
		var result = [];
		var remaining = _.difference(this.working, [args]);
		// var i, j, rx, forward, backward;

		// forward = args;
		// for(i = 0; i < args.length; i++) {

		// 	backward = forward;

		// 	for(j = 0; j < forward.length-1; j++) {
		// 		rx = new RegExp(backward, 'i');
		// 		_.forEach(remaining, function(value) {
		// 			if(value.search(rx) !== -1) {
		// 				result.push(backward);
		// 				if(cb) cb(backward, value);
		// 			}
		// 		});
		// 		backward = removeLastLetter(backward);
		// 	}

		// 	forward = removeFirstLetter(forward);
		// }

		// return result;

		_.forEach(remaining, function(word) {
			if(args.toLowerCase() === word.toLowerCase()) return;
			var i, j, rx, forward = args, backward;

			for(i = 0; i < args.length; i++) {
				backward = forward;

				for(j = 0; j < forward.length-1; j++) {
					rx = new RegExp(backward, 'i');
					if(word.search(rx) !== -1) {
						result.push(backward);
						if(cb) cb(backward, value);
					}

					backward = removeLastLetter(backward);
				}

				forward = removeFirstLetter(forward);
			}
		});

		return result;

	}

});

var removeFirstLetter = function(word) {return word.substr(1);};
var removeLastLetter = function(word) {return word.slice(0, -1);};

// var search = module.exports = function(args) {
// 	if(!(this instanceof search)) return new search(args);

// 	var self = this;
// 	this.working = args;

// 	// Populate 'every' object.
// 	_.forIn(this, function(value, key) {
// 		if(_.isFunction(value)) {

// 			this.every[key] = function(term, cb) {

// 				var a = arguments;

// 				_.forEach(self.working, function(item, index) {
// 					var args = Array.prototype.slice.call(a);
// 					args.unshift(item);

// 					value.apply(self, args);
// 				});

// 			};
// 		}
// 	}, this);

// 	this.for = _.omit(this, 'for');

// 	return this;
// };


// _.assign(search.prototype, {

// 	prefix: function(term, cb) {
// 		var remaining = _.difference(this.working, [term]);
// 		var len = term.length;

// 		for(var i = 0; i < len; i++) {
// 			_.forEach(remaining, function(value) {
// 				if(term === value.slice(0, term.length)) {
// 					cb(term, value);
// 				}
// 			});
// 			term = removeLastLetter(term);
// 		}

// 	},

// 	suffix: function(term, cb) {
// 		var remaining = _.difference(this.working, [term]);
// 		var len = term.length;

// 		for(var i = 0; i < len; i++) {
// 			_.forEach(remaining, function(value) {
// 				if(term === value.slice(-term.length)) {
// 					cb(term, value);
// 				}
// 			});
// 			term = removeFirstLetter(term);
// 		}
// 	},

// 	cluster: function(term, cb) {
// 		/*
// 		 * Searches like so:
// 		 * forward | backward
// 		 * --------+---------
// 		 *    home | hom - ho - h
// 		 *     ome | om - o
// 		 *      me | m
// 		 *       e | 
// 		 *
// 		 * i.e. It takes the word, and removes the last letter until 0.
// 		 * Then, it removes the first letter and repeats. This gives
// 		 * every possible letter combination a try.
// 		 */
// 		var remaining = _.difference(this.working, [term]);
// 		var len = term.length;
// 		var rx, backward, forward = term;

// 		for(var i = 0; i < len; i++) {
// 			backward = forward;
// 			for(var j = 0; j < forward.length-1; j++) {
// 				// console.log(backward, forward);
// 				rx = new RegExp(backward, 'i');
// 				_.forEach(remaining, function(value) {
// 					if(value.search(rx) !== -1) cb(backward, value);
// 				});
// 				backward = removeLastLetter(backward);
// 			}

// 			forward = removeFirstLetter(forward);
// 		}

// 	},

// 	every: {}

// });



