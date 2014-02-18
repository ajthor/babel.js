var _ = require("lodash");

// Layer Class
// -----------
var layer = exports.layer = function layer(parent) {
	this._nodes = [];
	this.__parent__ = parent;
	this.__network__ = parent.__network__;
};

_.extend(layer.prototype, {

	parse: function(input) {
		var result;
		var working;
		// console.log("layer received", input);
		// Clone input.
		input = input.slice();
		// Take off the first letter.
		working = input.shift();
		// console.log("number of possibilities:", this._nodes.length);
		// Cycle through all nodes and compare.
		for(var i = 0, len = this._nodes.length; i < len; i++) {
			result = this._nodes[i].parse(working, input);
			// If a result is found, return. No need to continue.
			if(result[0] !== 0) {
				return result;
			}
		}

		// If no result, it means there is no node available to handle this input.
		// Create a new node to handle this specific input,
		var n = new node(working, this);
		this._nodes.push(n);
		// and run the input through it.
		result = n.parse(working, input);
		result[0] = 0;
		
		return result;
	}

});

// Node Class
// ----------
var node = exports.node = function node(comparator, parent) {
	this.comparator = comparator;
	this.__parent__ = parent;
	this.__network__ = parent.__network__;

	this.incidence = 0;
};

_.extend(node.prototype, {
	parse: function(compare, input) {
		// console.log("comparing", this.comparator, "<<<>>>", compare);
		var result = [];
		var remainder;
		// Check for a match.
		if(_.isEqual(this.comparator, compare)) {
			// Found a match. Fire node.
			// Extend backtrace.
			this.__network__.backtrace.push(this);
			// Increment incidence
			this.incidence++;
			// Get the rest of the string.
			remainder = input.slice(this.comparator.length-1, input.length);

			// Continue with another layer unless the remainder is zero.
			if(remainder.length > 0) {
				if(!this._layer) {
					this._layer = new layer(this);
				}
				result = this._layer.parse(remainder);
			}
			// Return truey because of a match.
			return [1].concat(result);
		}
		// No match, return falsey.
		return [0].concat(result);
	}
});


