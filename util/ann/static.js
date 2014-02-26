var _ = require("lodash");

// Layer Class
// -----------
var layer = exports.layer = function layer() {
	this._neurons = [];
};

_.extend(layer.prototype, {

	input: function(input) {
		var result = [];
		input = input.slice();
		// Run input through all neurons.
		for(var i = 0, len = this._neurons.length; i < len; i++) {
			result[i] = this._neurons[i].input(input);
		}
		return result;
	}

});

// Neuron Class
// ------------
var neuron = exports.neuron = function neuron() {
	// Create weights array, including bias.
	this.w = [-1];
	this.delta = 1;
	this.momentum = 1;

	this.output = 0;
};

_.extend(neuron.prototype, {
	input: function(input) {
		var sum = 0;
		sum += this.w[0];
		// For every input, ...
		for(var i = 0, len = input.length; i < len; i++) {
			// Check if there is a weight assiciated with this level.
			if(!this.w[i+1]) {
				// If no weight available to handle this input, create a new, random weight.
				this.w.splice(i+1, 0, Math.random());
			}
			// Get sum of inputs * weights.
			sum += input[i]*this.w[i+1];
		}

		// Run through activation function & return result.
		return this.output = (function(input) {
					return ( 1 / (1 + Math.exp(-1 * input)) );
				})(sum);
	}

});
