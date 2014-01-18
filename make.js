var _ = require("lodash");

var make = module.exports = {

	pattern: function() {
		return pattern(Array.prototype.slice.call(arguments));
	}

};