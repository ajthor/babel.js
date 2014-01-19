var _ = require("lodash");
// Create local references to array methods we'll want to use later.
var array = [];
var push = array.push;
var slice = array.slice;
var splice = array.splice;


var collection = module.exports = function(obj) {
	this.template = {};
	if(_.isObject(obj)) this.template = obj;
	else {
		var args = Array.prototype.slice.call(arguments);
		_.forEach(args, function(property, key) {
			this.template[property] = null;
		}, this);
	}
	this.working = [];
};

_.assign(collection.prototype, {
	create: function(obj) {
		var result = {};
		var args = Array.prototype.slice.call(arguments);
		if(args.length > 1) {
			result = _.zipObject(_.keys(this.template), args);
		}
		else {
			obj || (obj = {});
			result = _.defaults(obj, this.template);
		}
		return result;
	},

	add: function(args, cb) {
		var item;
		if(args instanceof collection) {
			_.forEach(args.working, function(item) {
				var result = this.get(item.item);
				if(!result) {
					this.working.push(item);
				}
				else {
					result.frequency += item.frequency;
				}
			}, this);
		}
		else if(_.isArray(args)) {
			_.forEach(args, function(value) {
				this.add(value);
			}, this);
		}
		else {
			// Add
			if((item = this.get(args)) !== undefined) {
				item.frequency += 1;
			}
			else {
				args = {item: args, frequency: 1};
				this.working = _.union(this.working, [args]);
			}
		}
	},

	get: function(item) {
		if(!item) return this.working;
		return _.find(this.working, {item: item});
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
	},

	significant: function() {
		var max = _.max(this.working, 'frequency').frequency;
		var min = _.min(this.working, 'frequency').frequency;

		console.log(max, min);

		_.remove(this.working, function(item) {
			return !!(item.frequency < (Math.sqrt(max))+min);
		});

		return this.working;
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


