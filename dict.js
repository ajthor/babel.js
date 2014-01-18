var _ = require("lodash");
var word = require("./word");

var dict = module.exports = function Dict(args, options) {
	if(!(this instanceof dict)) return new dict(args, options);
	options || (options = {});

	this.id = _.uniqueId("dict");

	if(!args) return this;

	if(args.dict) this.dict = args.dict;
	else this.add(args, options);

};

_.assign(dict.prototype, {

	dict: [],

	add: function(arr, options) {
		if(!Array.isArray(arr)) arr = [arr];
		arr.forEach(function(item) {
			if(!(item instanceof word)) item = new word(item);
			var index, updated = false;

			for(var i = 0; i < this.dict.length; i++) {
				if(this.dict[i].hash === item.hash) {
					// Already here. Just update.
					updated = true;
				}
			}

			if(!updated) {
				index = _.sortedIndex(this.dict, {hash: item.hash});
				this.dict.splice(index, 0, item);
			}

		}, this);
	},
	remove: function() {},

	get: function(index) {
		return this.dict[index];
	}

});




