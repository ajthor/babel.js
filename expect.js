var _ = require("lodash");
var search = require("./search.js");

// Trickle down function.
var trickleDown = function(obj, property) {
	_.forIn(obj, function(value, key) {
		if((_.isObject(value)) && (!_.isFunction(value))) {
			value.working = property;
			trickleDown(value, property);
		}
	});
};

var expect = module.exports = function expect(args) {
	if(!(this instanceof expect)) return new expect(args);
	
	this.working = args;
	trickleDown(this, this.working);

	return this;
};

_.assign(expect.prototype, {

	not: {},

	toBe: function(args) {
		return (this.working === args);
	},

	toContain: function(args) {
		return (this.working.search(args) !== -1);
	},

	toHave: {

		pattern: function(args) {
			var result = [];
			search(this.working).for.every.pattern(function(value) {result.push(value);});
			// console.log(result);
			for(var i = 0; i < result.length; i++) {
				if(_.isEqual(result[i], args)) {
					return true;
				}
			}
			return false;
		},

		prefix: function(args) {
			return (args === this.working.slice(0, args.length));
		},

		suffix: function(value) {
			return (value === this.working.slice(-value.length));
		},

		cluster: function(value) {
			return (this.working.search(value) !== -1);
		}

	}

});

var migrate = function(src, dest) {

	_.forEach(src, function(value, key) {
		if(src.hasOwnProperty(key) && (key !== 'not')) {

			if((_.isObject(src[key])) && (!_.isFunction(src[key]))) {
				
				dest[key] = {};
				migrate(src[key], dest[key]);

			}
			else if(_.isFunction(value)) {

				dest[key] = function() {
					var args = Array.prototype.slice.call(arguments);
					// args.unshift(src);
					return !value.apply(src, args);
				};

			}
			else {
				dest[key] = src[key];
			}

		}

	});

};

migrate(expect.prototype, expect.prototype.not);




