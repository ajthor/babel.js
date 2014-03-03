var _ = require("lodash");

var system = module.exports = function(network) {
	if(!(this instanceof system)) return new system(network);
	this.network = network;
};

_.extend(system.prototype, {

	initialize: function() {

	},

	train: function() {}
	
});