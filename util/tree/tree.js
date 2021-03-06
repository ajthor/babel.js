var _ = require("lodash");

// Network Class
// -------------
var network = module.exports = function newtwork(options) {
	if(!(this instanceof network)) return new network(options);
	this.options = _.defaults((options || {}), {
		iterations: 200
	});
	// Create layer 1
	this._layer = new layer(this);
};

_.extend(network.prototype, {
	parse: function(input) {
		console.log("\nParsing {", input, "} ...");
		// Force array type.
		if(typeof input === 'string') {
			input = input.split('');
			input.push("#"); // End of word character
			// If you're struggling with whether or not this is necessary,
			// consider single-letter morphemes at the end of words, i.e. '-s'
		}
		// Reset trace.
		this.trace = [];
		// Pass input through layer and get difference.
		return this._layer.parse(input);
	}
});

// Layer Class
// -----------
var layer = exports.layer = function layer(parent) {
	this._nodes = [];
	this.__network__ = parent;
};

_.extend(layer.prototype, {
	parse: function(input) {
		var result;
		var working;
		// Clone input.
		input = input.slice();
		// Take off the first letter.
		working = input.shift();
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
		var n = new node(working, this.__network__);
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
	this.__network__ = parent;

	this.incidence = 0;
};

_.extend(node.prototype, {
	parse: function(compare, input) {
		var result = [];
		var remainder;
		// Check for a match.
		if(_.isEqual(this.comparator, compare)) {
			// Found a match. Fire node.
			// Extend trace.
			this.__network__.trace.push(this);
			// Increment incidence
			this.incidence++;
			// Get the rest of the string.
			remainder = input.slice(this.comparator.length-1, input.length);

			// Continue with another layer unless the remainder is zero.
			if(remainder.length > 0) {
				if(!this._layer) {
					this._layer = new layer(this.__network__);
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


