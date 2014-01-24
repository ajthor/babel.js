var _ = require("lodash");

pattern = exports.pattern = function(rx, cb) {
	if(!rx) return void 0;
	var result = [];
	this.working.forEach(function(item) {
		var matches = item.match(rx);
		for(var i in matches) {
			if(cb) cb(matches[i]);
			result.push(matches[i]);
		}
	});
	this.working = result;
	return this._make(result);
};

significant = exports.significant = function(cb) {
	var result = [];
	var matches = [];
	var search = this.working.slice(0);
	var remove;

	var total = this.working.length;

	this.working.forEach(function(item) {
		remove = _.remove(search, function(thing) {
			return !!(thing == item);
		});
		if(remove.length > 1) {
			matches.push(remove);
			result.push(item);
		}


	}, this);

	// var avg = total/matches.length;

	console.log(total);

	// result = _.remove(result, function(item) {
	// 	return item.length > avg;
	// });

	console.log(result);
	console.log(matches);

	return this._make(result);
};

sentences = exports.sentences = function(cb) {
	var rx = /[\S][^\.!\?]+[\.!\?\"]+/g;
	return this.pattern(rx, cb);
};

words = exports.words = function(cb) {
	var rx = /\b\S+\b/g;
	return this.pattern(rx, cb);
};

prefixes = exports.prefixes = function(cb) {
	var rx = /\b\w+\b/gi;
	var result = [];
	this.working.forEach(function(item) {
		var matches = item.match(rx);
		matches.forEach(function(word) {
			for(var i = 0, len = word.length; i < len-1; i++) {
				// Remove last letter.
				word = word.slice(0, -1);
				if(cb) cb(word);
				result.push(word);
			}
		});
	});
	this.working = result;
	return this._make(result);
};

suffixes = exports.suffixes = function(cb) {
	var rx = /\b\w+\b/gi;
	var result = [];
	this.working.forEach(function(item) {
		var matches = item.match(rx);
		matches.forEach(function(word) {
			for(var i = 0, len = word.length; i < len-1; i++) {
				// Remove last letter.
				word = word.substr(1);
				if(cb) cb(word);
				result.push(word);
			}
		});
	});
	this.working = result;
	return this._make(result);
};

unique = exports.unique = function(cb) {
	var words = this.words().working;
	var result = _.uniq(words, function(word) {return word.toLowerCase();});
	result.forEach(function(item) {
		if(cb) cb(item);
	});
	return this._make(result);
};




