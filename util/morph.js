// var each = function(obj, iterator, context) {
// 	if (obj == null) return;
// 	if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
// 		obj.forEach(iterator, context);
// 	} else if (obj.length === +obj.length) {
// 		for (var i = 0, length = obj.length; i < length; i++) {
// 			if (iterator.call(context, obj[i], i, obj) === {}) return;
// 		}
// 	} else {
// 		var keys = _.keys(obj);
// 		for (var i = 0, length = keys.length; i < length; i++) {
// 			if (iterator.call(context, obj[keys[i]], keys[i], obj) === {}) return;
// 		}
// 	}
// };

var _ = require("lodash");

var morph = exports.morph = function(obj, dest, cb) {
	if(!cb && _.isFunction(dest)) {
		cb = dest;
		dest = obj;
	}
	_.forIn(obj, function(property, key) {
		if(_.isFunction(property)) {

			dest[key] = cb(obj, property);

		}

	}, this);
};

var dest;
morph(
{
	hello: function(){console.log("Hello!");}
}, dest = {}, function(src, property) {
	var args = Array.prototype.slice.call(arguments);
	return property.apply(src, args);
});