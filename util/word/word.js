var _ = require("lodash");
var model = require("backbone-node").model;

var word = module.exports = model.extend({
	initialize: function(word) {
		this.set("word", word.toLowerCase());
		this.id = _.uniqueId("w");
		this.primaryKey = "word";
	},

	compare: function(args) {
		if(!Array.isArray(args)) args = [args];
		args = _.uniq(args);

		var working = this.get("word");

		args.forEach(function(item) {
			if(!(item instanceof word)) item = new word(item);
			var compare = item.get("word");
			// var aggregate = [];
			var related = false;

			compare = working.slice(working.indexOf(compare[0]));
			// console.log("word", working, compare);
			// aggregate = _.union([item], (item.get("related") || []));

			// The first letter is almost always right.
			// Trim to the first letter and lev distance from there.


			if(related) {
				this.relateTo(item);
			}
		}, this);

		// return result;
	},

	relateTo: function(args) {
		var related = _.union([this], [args], (this.get("related") || []), (args.get("related") || []));
		related.forEach(function(item) {
			var remaining = _.difference(related, [item]);
			item.set("related", remaining);
		}, this);
	}

});


