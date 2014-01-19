var _ = require("lodash");

var word = module.exports = function Word(word, options) {
	options || (options = {});
	if(!_.isString(word)) throw new Error("Must provide a string when creating a new word.");
	
	this.word = word.toLowerCase();

	_.assign(this, _.defaults(options, {

	}));

	this.hash = this.hash();
	this.id = _.uniqueId(this.category);

};

_.assign(word.prototype, {

	category: "none",
	/** 
	 * None
	 * Pronoun
	 * Noun
	 * Verb
	 * Adverb
	 * Adjective
	 * Conjunction
	 **/

	related: [],
	collocations: [],
	patterns: [],

	hash: function(str) {
		if(!str) str = this.word+this.id+this.category;
		var hash = 0, i, ch;
		for (i = 0, l = str.length; i < l; i++) {
		    ch  = str.charCodeAt(i);
		    hash  = ((hash<<5)-hash)+ch;
		    hash |= 0; // Convert to 32bit integer
		}
		return hash;
	},

	toString: function() {return this.word;}

});




