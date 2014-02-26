var _ = require("lodash");
var neuron = require("./static.js").neuron;
var layer = require("./static.js").layer;
// Network Class
// -------------
var network = module.exports = function(neurons, options) {
	if(!(this instanceof network)) return new network(neurons, options);
	// Set default options.
	this.options = _.defaults((options || {}), {
		iterations: 1,
		learningRate: 0.1
	});
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
					result = this._layers[j].input(result);
				}

			}

			var sum = result.reduce(function(a, b) {
				return a + b;
			});

			return result;

		} catch(e) {
			console.log("ERROR:", e.stack);
		}
	},

	train: function(output, target) {


		var i, j, k, error, dx;
		var layer, previous;

		for(var iterations = 0; iterations < this.options.iterations; iterations++) {

			// Working backwards, for each layer, calculate delta values.
			// output -> layer n -> ... -> layer 2 -> layer 1 -> layer 0
			for(i = this._layers.length-1; i >= 0; i--) {
				// Set this layer to the layer variable for easier referencing.
				layer = this._layers[i];

				if(!this._layers[i+1]) { // This is the last layer.
					// Do stuff using output instead of next layer's neurons.
					// For each output, calculate the delta.
					for(j = 0; j < output.length; j++) {
						layer._neurons[j].momentum = layer._neurons[j].delta;
						layer._neurons[j].delta = layer._neurons[j].output * (1 - layer._neurons[j].output) * (target[j] - layer._neurons[j].output);
						// layer._neurons[j].delta = target[j] - layer._neurons[j].output;
					}
				}
				// Otherwise, the next layer exists, and we will use
				// its neurons to backpropagate this layer.
				else {
					previous = this._layers[i+1]._neurons;

					// For each neuron in this layer, there will be
					// a corresponding weight in the next layer's neurons.
					for(j = 0; j < layer._neurons.length; j++) {
						error = 0.0;
						// So go through the previous layer's neurons's weights
						// and get those weights * that layer's delta value.
						for(k = 0; k < previous.length; k++) {
							// The weight corresponding to this neuron will be j.
							error += previous[k].w[j] * previous[k].delta;
						}
						// That will give us this neuron's delta value.
						layer._neurons[j].momentum = layer._neurons[j].delta;
						layer._neurons[j].delta = layer._neurons[j].output * (1 - layer._neurons[j].output) * error;

					}

				} // End else statement.

			}
			// Now that every neuron has its delta values, we can multiply the 
			// weights of each neuron by the delta in order to get the new values.
			for(i = 0; i < this._layers.length; i++) {


				// For each neuron, multiply every weight by the delta value.
				for(j = 0; j < this._layers[i]._neurons.length; j++) {
					// Calculate derivative value.
					// dx = this._layers[i]._neurons[j].output * (1 - this._layers[i]._neurons[j].output);

					for(k = 0; k < this._layers[i]._neurons[j].w.length; k++) {
						this._layers[i]._neurons[j].w[k] += this.options.learningRate * this._layers[i]._neurons[j].delta * this._layers[i]._neurons[j].output;
					}
				}
			}

		}

	}

});