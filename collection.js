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
	this.primaryKey = _.keys(this.template)[0];
	this._items = [];
};

_.assign(collection.prototype, {
	create: function(obj) {
		if(!obj) return new this.template();

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
		var args = Array.prototype.slice.call(arguments);
		if(_.isFunction(args[args.length-1])) {
			cb = args.pop();
		}
		else {
			cb = function(accumulator, value, key, object) {
				accumulator[key] = value;
			};
		}

		console.log("cb", cb);

		var obj = this.create.apply(this, args);
		var item = this.get(obj);
		
		if(item !== undefined) {
			// Update
			console.log("update", item);
			_.transform(item, function(accumulator, value, key, object) {
				var args = Array.prototype.slice.call(arguments);
				cb.apply(this, args);
			});

			console.log("result", item);
		}
		else {
			this._items = _.union(this._items, [obj]);
		}

	},

	get: function(args) {
		if(!args) return this._items;

		var search = {};
		search[this.primaryKey] = args[this.primaryKey];
		// console.log("find", search, "in", this._items);

		return _.find(this._items, search);
	}

	// significant: function() {
	// 	var max = _.max(this._items, 'frequency').frequency;
	// 	var min = _.min(this._items, 'frequency').frequency;

	// 	console.log(max, min);

	// 	_.remove(this._items, function(item) {
	// 		return !!(item.frequency < (Math.sqrt(max))+min);
	// 	});

	// 	return this._items;
	// }
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
		args.unshift(this._items);
		return _[method].apply(_, args);
	};
});


