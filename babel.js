var _ = require("lodash");
var when = require("when");

var parse = require("parsejs");

var collection = require("backbone-node").collection;


var node = require("./util/tree/tree.js").node;
var layer = require("./util/tree/tree.js").layer;

//
//
//

var babel = module.exports = function babel(options) {
	if(!(this instanceof babel)) return new babel(options);
	this.options = _.defaults((options || {}), {
		debug: false,
		iterations: 200
	});
	// Create layer 1
	this._layer = new layer(this);
	this._layer.__network__ = this;
	this.backtrace = [];

	this.morphemes = [];
};

_.extend(babel.prototype, {
	parse: function(input) {
		try {
			var count = 0;
			// For every ten sentences, one sentence at a time, ...
			// parse(input).pattern(/(?:[^\.!\?]+[\.!\?\"\']+){0,10}/gi).sentences(function(sentence) {

				// For every word, ...
				parse(input).words(function(item) {
					
					console.log("\nParsing {", item, "} ...");
					count++;
					// Force array type.
					if(typeof item === 'string') {
						item = item.split('');
						item.push("#"); // End of word character
						// If you're struggling with whether or not this is necessary,
						// consider single-letter morphemes at the end of words, i.e. '-s'
					}
					// Reset backtrace.
					this.backtrace = [];
					// Pass item through layer and get difference.
					var difference = this._layer.parse(item);
					var potential = _.map(this.backtrace, function(item) {
						return item.__parent__._nodes.length;
					});
					var incidence = _.map(this.backtrace, function(item) {
						return item.incidence;
					});


					// var incidenceMin = _.min(incidence);
					var predicted = [];
					var sum = 0;
					// Working backwards, ...
					for(var i = item.length-1; i >= 0; i--) {

						// Create sum of difference.
						sum += difference[i];
						
						// Weight each item based on its proximity to the beginning of the word.
						potential[i] = Math.round(Math.log(i+1)*potential[i]);
						// incidence[i] = Math.ceil((Math.log(i+1)/Math.E)*incidence[i]*100)/100;
						// incidence[i] = +!!(incidence[i]-incidenceMin);
						// Find an occurrence which has a frequency larger than 3.
						if(potential[i] >= 3) {
							predicted.push(item.slice(0, i));
							predicted.push(item.slice(i));
						}

					}

					console.log(difference, sum, item.slice(0, sum), item.slice(sum));
					console.log(potential, predicted);
					console.log(incidence);

					// Find predicted split based on difference.



				}.bind(this));


			// }.bind(this));


		
			console.log("\nAnalyzed %d words.", count);



		} catch(e) {
			console.log("ERROR:", e.stack);
		}
	}

});

