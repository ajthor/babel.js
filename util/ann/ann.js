var _ = require("lodash");
var neuron = require("./static.js").neuron;
var layer = require("./static.js").layer;
// Network Class
// -------------
var network = module.exports = function(neurons, options) {
	if(!(this instanceof network)) return new network(neurons, options);
	// Set default options.
	this.options = _.defaults((options || {}), {
		iterations: 100,
		learningRate: 0.1,
		activation: function(input) {
			return ( 1 / (1 + Math.exp(-1 * input)) );
		}
	});
	// Set delta values for training.
	this.delta = [];
	// Initialize network.
	if(!neurons) neurons = [1]; // Single layer.
	this.initialize(neurons);
};

_.extend(network.prototype, {
	initialize: function(neurons) {
		try {
			if(!Array.isArray(neurons)) neurons = [neurons];
			// Create layers array.
			this._layers = new Array(neurons.length);
			// Initialize layers. For each layer, ...
			for(var i = 0, len = neurons.length; i < len; i++) {
				this._layers[i] = new layer();
				this.delta[i] = [];
				// Populate with n new neurons.
				for(j = 0; j < neurons[i]; j++) {
					this._layers[i]._neurons.push(new neuron());
				}
			}
		} catch(e) {
			console.log("Error:", e.stack);
		}
	},

	input: function(input) {
		try {
			// Parse input.
			if(!Array.isArray(input)) input = [input];
			var i, j, result = input;
			// Pass input to layer(s).
			// Until maximum iterations or error threshold is reached.
			for(i = 0; i < this.options.iterations; i++) {
				// For each layer, ...
				for(j = 0; j < this._layers.length; j++) {
					result = this._layers[j].parse(result);
				}

			}

			console.log("\nRESULT:", result);

			var sum = result.reduce(function(a, b) {
				return a + b;
			});

			return result;

		} catch(e) {
			console.log("ERROR:", e.stack);
		}
	},

	train: function(output, target) {
		// The learning rule can be summarized in the following two equations:

		// b = b + [ T - A ]

		// For all inputs i:

		// W(i) = W(i) + [ T - A ] * P(i)
		
		// Where W is the vector of weights, P is the input vector presented 
		// to the network, T is the correct result that the neuron should 
		// have shown, A is the actual output of the neuron, and b is the bias.

		var error = 0.0;
		var i, j, len, last = this._layers.length-1;
		// Get deltas of output layer.
		for(i = 0, len = output.length; i < len; i++) {
			// Difference multiplied by the derivative of the activation (sigmoid).
			this.delta[i] = output[i] * (1 - output[i]) * (target[i] - output[i]);
		}
		// For the last layer, ...
		for(i = 0, len = this._layers[last]._neurons.length; i < len; i++) {

			// For every neuron and its weights, ...
			for(j = 0; j < this._layers[last]._neurons[i].w.length; j++) {
				console.log("d_this = d * w", this.delta[j], this._layers[last]._neurons[i].w);
			}
		}
		console.log(this.delta);

		// For every layer, ... (-1 here makes it every layer before output)
		if(last > 1) {
			for(var i = last-1; i >= 0; i--) {
				error = 0.0;
				for(j = 0, len = this._layers[i+1]._neurons.length + 1; j < len; j++) {
					
				}
				// this.delta[i]
			}
		}


	}

});