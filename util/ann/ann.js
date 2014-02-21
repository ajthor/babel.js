var _ = require("lodash");
var neuron = require("./static.js").neuron;
var layer = require("./static.js").layer;
// Network Class
// -------------
var network = module.exports = function(options) {
	if(!(this instanceof network)) return new network(options);
	
};

_.extend(network.prototype, {
	input: function(input) {
		try {
			// Parse input.
			if(!Array.isArray(input)) input = [input];
			
			// Pass input to perceptron(s).
			var n = new neuron();
			console.log(n.parse(input));

		} catch(e) {
			console.log("ERROR:", e.stack);
		}
	}

});