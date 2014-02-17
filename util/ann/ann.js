var _ = require("lodash");
var node = require("./static.js").node;
var layer = require("./static.js").layer;
// Network Class
// -------------
var network = module.exports = function(options) {
	if(!(this instanceof network)) return new network(options);
	this.options = _.defaults((options || {}), {
		iterations: 200
	});
	// Create layer 1
	this._layer = new layer(this);
	this._layer.__network__ = this;
	this.backtrace = [];
};

_.extend(network.prototype, {
	parse: function(input) {
		try {
			if(!Array.isArray(input)) input = [input];
			input.forEach(function(item) {

				var result = [];
				console.log("\n\nParsing {", item, "} ...");
				// Force array type.
				if(typeof item === 'string') {
					item = item.split('');
					item.push("#"); // End of word character
				}
				// Reset backtrace.
				this.backtrace = [];
				// Pass item through layer and get result.
				result = this._layer.parse(item);

			}, this);
		} catch(e) {
			console.log("ERROR:", e.stack);
		}
	}

});