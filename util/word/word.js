var _ = require("lodash");
var model = require("backbone-node").model;

var lev = require("levenshtein");
var parse = require("parsejs");

var word = module.exports = model.extend({
	initialize: function(word) {
		this.set("word", word.toLowerCase());
		this.id = _.uniqueId("w");
		this.primaryKey = "word";
	},

	compare: function(args) {
		if(!Array.isArray(args)) args = [args];
		var possible = _.uniq(args);

		var working = this.get("word");

		possible.forEach(function(item) {
			if(!(item instanceof word)) item = new word(item);
			var compare = item.get("word");
			// Don't compare shorter words.
			if(compare.length < 4) return;

			console.log(working, "->", compare);

			var dist;
			var relatedness;
			var stem;
			var aggregate = [];
			var relate = false;

			// Calculate the distance.
			dist = lev(working, compare);
			relatedness = (1/dist)*Math.log(compare.length);

			console.log(relatedness);
			// And if it's close enough, accounting for smaller words,
			if(relatedness > 1) {
				// Then check the stem.
				aggregate = _.union([this, item]);//, item.get("related"));
				stem = parse(_.map(aggregate, function(thing) {
					return thing.get("word");
				})).stem();

				// if(stem) console.log( stem, stem.length,  (2*stem.length)/(working.length+compare.length) );
				// If no stem returned, no relation.
				if(stem && ( (2*stem.length)/(working.length+compare.length) >= 0.75) ) {

					relate = true;

					// if(!item.get("related") || parse(_.map(_.union([item], item.get("related")), function(thing) {
					// 	return thing.get("word");
					// })).stem().search(stem) !== -1) {
						console.log("I think", working, "and", compare, "are related.");
					// 	relate = true;
					// }
				}
				
				// Relate to eachother. 
				if(relate) {
					this.set("stem", stem);					
					this.relateTo(item);
				}
			}
		}, this);

		// return result;
	},

	relateTo: function(args) {
		var stem = this.get("stem");
		var related = _.union([this], [args], (this.get("related") || []), (args.get("related") || []));
		related.forEach(function(item) {
			var remaining = _.difference(related, [item]);
			item.set("related", remaining);
			item.set("stem", stem);
		}, this);
	}

});


