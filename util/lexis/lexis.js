var _ = require("lodash");
var collection = require("../collection/collection.js");

var lexis = module.exports = function(args) {
	if(!(this instanceof lexis)) return new lexis(args);
	if(!args) return this;
	
	this._raw = this.working = (Array.isArray(args)) ? args : [args];
};

_.extend(lexis.prototype, require("./static.js"));
_.extend(lexis.prototype, {

	_raw: [],

	get: function(id) {return this.working;},

	reset: function() {
		if(this.previous) this._raw = this.previous._raw;
		this.working = this._raw;
	},

	contains: function(item) {
		return !!(this.working.indexOf(item) !== -1);
	},

	toCollection: function() {
		var result = new collection(String);
		this.working.forEach(function(item) {
			result.add(new String(item));
		});
		return result;
	},

	_make: function(args) {
		var obj = new lexis(args);
		obj.previous = this;
		return obj;
	}
	
});

var methods = ['first', 'last', 'rest', 'flatten', 'difference', 
				'intersection', 'indexOf', 'forEach'];

_.each(methods, function(method) {
	lexis.prototype[method] = function() {
		var args = Array.prototype.slice.call(arguments);
		args.unshift(this.working);
		return _[method].apply(_, args);
	};
});




