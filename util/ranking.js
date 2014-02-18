var _ = require("lodash");

// Collaborative Ranking System
var crs = module.exports = function() {
	this.systems = [];
};

_.extend(crs.prototype, {

	add: function(f) {

	},

	rank: function(input) {
		// Cycle through each system.
		for(var i = 0, len = this.systems.length; i < len; i++) {

		}
	}

});

var system = function system() {

};

system.prototype.rank = function(input) {

};


