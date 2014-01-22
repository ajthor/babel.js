var _ = require("lodash");
var model = require("lodash");

var relatedModel = module.exports = function() {
	var args = Array.prototype.slice.apply(arguments);
	return model.apply(this, args);
};
relatedModel.prototype = model.prototype;

_extend(relatedModel.prototype, {

});