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

		var result = {};
		var args = Array.prototype.slice.call(arguments);
		try {
			if(!obj) return new this.template(args);
		} catch (e) {
			console.log("Not an object.", "Error:", e);
		}

		if(_.isObject(obj)) {
			result = _.defaults(obj, this.template);
		}
		else {
			result = _.zipObject(_.keys(this.template), args);
			result = _.defaults(result, this.template);
		}
		return result;
		
	},

	add: function(args, cb) {
		if(args instanceof collection) {
			_.forEach(args._items, function(item) {
				this.add(item, cb);
			}, this);
		}
		else {
			var args = Array.prototype.slice.call(arguments);
			if(_.isFunction(args[args.length-1])) {
				cb = args.pop();
			}
			else {
				cb = function(obj, value, key) {
					obj[key] = value;
				};
			}

			var obj = this.create.apply(this, args);
			var item = this.get(obj);
			
			if(item !== undefined) {
				// Update
				_.forEach(item, function(value, key) {
					cb(item, obj[key], key);
				});
			}
			else {
				this._items = _.union(this._items, [obj]);
			}
		}

	},

	get: function(args) {
		if(!args) return this._items;

		var search = {};
		search[this.primaryKey] = args[this.primaryKey];

		return _.find(this._items, search);
	},

	hash: function(str) {
		if(!str) str = this.word+this.id+this.category;
		var hash = 0, i, ch;
		for (i = 0, l = str.length; i < l; i++) {
		    ch  = str.charCodeAt(i);
		    hash  = ((hash<<5)-hash)+ch;
		    hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}

});


