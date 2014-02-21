var _ = require("lodash");

// Collaborative Ranking System
var crs = exports.crs = function(systems) {
	this.systems = [].concat(systems);
};

_.extend(crs.prototype, {

	rank: function(input) {
		var result;
		// Cycle through each system.
		for(var i = 0, len = this.systems.length; i < len; i++) {
			result.push(this.systems[i](input));
		}
	}

});

var system = exports.system = function system(f, weight) {
	if(!(this instanceof system)) return new system(f);
	this.rankingFunction = f;
	this.weight = weight || 1;
};

_.extend(system.prototype, {

	rank: function(input) {
		try {
			
			var results = [];
			// Get results.
			if(Array.isArray(input)) result = _.map(input, function(item) {
				return this.rankingFunction(item);
			}, this);
			else return this.rankingFunction(input);
			// Order them according to surety.
			return results;

		} catch(e) {
			console.log("Error:", e.stack);
		}
	}

});


