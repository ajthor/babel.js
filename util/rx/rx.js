var _ = require("lodash");

var rx = module.exports = function(args) {
	if(!(this instanceof rx)) return new rx(args);

	if(!args) args = [];

	this._raw = this.working = (Array.isArray(args)) ? args : [args];
};

_.extend(rx.prototype, require("./static.js"));
_.extend(rx.prototype, {
	
	flags: [],

	get: function() {
		var result = "";
		this.working.forEach(function(item) {
			result += item;
		});
		return result;
	},

	generate: function(flags) {
		var args = Array.prototype.slice.apply(arguments);
		this.flags = _.union(this.flags, args);
		return new RegExp(this.get(), this.flags.join(""));
	},

	_make: function(args) {
		var obj = new rx(args);
		obj.previous = this;
		return obj;
	}

});