var _ = require("lodash");
// Create local references to array methods we'll want to use later.
var array = [];
var push = array.push;
var slice = array.slice;
var splice = array.splice;


var collection = module.exports = function(item) {
	this.working = [];
	if(item) this.add(item);
};

_.assign(collection.prototype, {
	add: function(args) {
		if(args instanceof collection) this.working = _.union(this.working, item.working);
		else if(_.isArray(args)) _.forEach(args, function(value) {
			this.add(value);
		}, this);
		else {
			this.working = _.union(this.working, [args]);
		}
	},

	get: function(item) {
		if(!item) return this.working;
		return _.find(this.working, item);
	},

	including: function(arr) {
		return _.union(this.working, arr);
	},

	excluding: function(arr) {
		return _.difference(this.working, arr);
	},

	matching: function(rx) {
		var result = [];
		_.forEach(this.working, function(value) {
			if(result.search(rx) !== -1) result.push(value);
		});
		this.working = _.pull(this.working, result);
		return this;
	}
});

// Underscore methods that we want to implement on the Collection.
var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
	'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
	'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
	'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
	'tail', 'drop', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf',
	'isEmpty', 'chain'];

// Mix in each Underscore method as a proxy to `Collection#models`.
_.forEach(methods, function(method) {
	collection.prototype[method] = function() {
		var args = slice.call(arguments);
		args.unshift(this.working);
		return _[method].apply(_, args);
	};
});


