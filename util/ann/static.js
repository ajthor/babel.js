var _ = require("lodash");

// Layer Class
// -----------
var layer = exports.layer = function layer() {
	this._neurons = [];
};

_.extend(layer.prototype, {

	parse: function(input) {
		var result;
		for(var i = 0, len = this._neurons.length; i < len; i++) {
			result = this._neurons[i].parse(input);
			console.log("result", result);
		}
	}

});

// Neuron Class
// ------------
var neuron = exports.neuron = function neuron() {
	// Create weights array, including bias.
	this.w = [-1];
};

_.extend(neuron.prototype, {
	parse: function(input) {
		var sum = 0;
		// For every input, ...
		for(var i = 0, len = input.length; i < len; i++) {
			// Check if there is a weight assiciated with this level.
			if(!this.w[i+1]) {
				// If no weight available to handle this input, create a new, neutral weight.
				this.w.splice(i, 0, 1);
			}
			// Create sum of inputs * weights.
			sum += input[i]*this.w[i];
		}

		// Run through activation function & return result.
		return (function(input) {
			return ( 1 / (1 + Math.exp(-1 * input)) );
		})(sum);
	},

	train: function() {

	}

});
