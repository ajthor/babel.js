var traverse = function(original, cb) {
	for(var key in original) {
		if((original.hasOwnProperty(key)) && (key !== 'not')) {
			if(_.isObject(original[key]) && !_.isFunction(original[key])) {
				traverse(original[key], cb);
			}
			else {
				cb(original[key], key);
			}
		}
	}
};

traverse(expect.prototype, function(result, key) {
	console.log(key);
});


_.assign(expect.prototype, {
	not: {},

	toHave: {

		prefix: function prefix(value) {
			return (value === this.working.slice(0, value.length));
		},

		suffix: function suffix(value) {
			return (value === this.working.slice(-value.length));
		},

		cluster: function cluster(value) {
			return (this.working.search(value) !== -1);
		}

	}

});

	// prefixes: function(arr, cb) {
	// 	// _.forEach(arr, function(value, index, collection) {
	// 		var remaining = _.difference(arr, [value]);
	// 		var term = value;
	// 		for(var i = 0; i < value.length; i++) {
	// 			_.forEach(remaining, function(value) {
	// 				if(term === value.slice(0, term.length)) {
	// 					cb(term, value);
	// 				}
	// 			});
	// 			term = removeLastLetter(term);
	// 		}
	// 	// });
	// },


/*collection.prototype.add = function(item) {
	var i, index;
	// If this is a collection.
	if(item instanceof collection) {
		for(i = 0; i < item._items.length; i++) {
			// Add all items in the other collection.
			this.add(item._items[i]);
		}
	}
	else {
		if(!(_.isArray(item))) item = [item];
		for(i = 0; i < item.length; i++) {
			// Find this item in existing array.
			index = this.getIndexOf(item[i].name);
			// If it exists, add up the frequencies.
			if(index !== -1) {
				this._items[index].frequency += item[i].frequency;
			}
			// Otherwise, push it to the array.
			else this._items.push(item[i]);
		}
	}
};
collection.prototype.get = function(name) {
	var result;
	if(result = this.find(name)) return result;
	else return this._items;
};
collection.prototype.find = function(name) {
	return _.find(this._items, function(item) {
		return name === item.name;
	});
};
collection.prototype.getIndexOf = function(name) {
	var i, result;
	for(i = 0; i < this._items.length; i++) {
		if(this._items[i].name === name) return i;
	}
	return -1;
};
*/


var findAllPatterns = exports.findAllPatterns = function(needle, haystack) {

	// console.log(needle, haystack);

	var pattern, result = [];

	var i, j, forward, backward;
	/**
	 * Searches like so:
	 * forward | backward
	 * --------+---------
	 *    home | hom - ho - h
	 *     ome | om - o
	 *      me | m
	 *       e | 
	 *
	 * i.e. It takes the word, and removes the last letter until 0.
	 * Then, it removes the first letter and repeats. This gives
	 * every possible letter combination a try.
	 **/

	forward = needle;
	for(i = 0; i < needle.length; i++) {
		backward = forward;
		for(j = 0; j < forward.length; j++) {
			// For all letter combinations, ...
			pattern = findPatternInArray(backward, haystack);
			// Add the pattern to the result array.
			result = addPatternsToArray(pattern, result);
			
			backward = removeLastLetter(backward);
		}

		forward = removeFirstLetter(forward);
	}

	result = removeSingleLetterPatterns(result);
	result = removeSingleFrequencyPatterns(result);

	return result;
};

var findAllPrefixes = exports.findAllPrefixes = function(arr) {
	var pattern, result = [];
	for(var i = 0; i < arr.length; i++) {
		pattern = findPrefix(arr[i], arr.splice(i, 1));
		result = addPatternsToArray(pattern, result);
	}
	return result;
};

var findPrefix = exports.findPrefix = function(needle, haystack) {
	var pattern, previous, result = [];
	var i, j;

	var prefix;
	prefix = needle;
	for(i = 0; i < needle.length; i++) {

		pattern = findPrefixInArray(prefix, haystack);
		if((pattern.frequency > 0) && (pattern.frequency > previous.frequency)) {
			result = addPatternsToArray(pattern, result);
		}

		prefix = removeLastLetter(prefix);
		previous = pattern;
	}

	return result;
};

var findPrefixInArray = exports.findPrefixInArray = function(pattern, arr) {
	var prefix, result = {pattern: pattern, frequency: 0};
	for(var i = 0; i < arr.length; i++) {
		prefix = arr[i].slice(0, pattern.length);
		prefix = prefix.toLowerCase();
		pattern = pattern.toLowerCase();
		if(prefix == pattern) result.frequency += 1;
	}
	return result;
};

var findSuffix = exports.findSuffix = function(needle, haystack) {
	var pattern, previous, result = [];
	var i, j;

	var suffix;
	suffix = needle;
	for(i = 0; i < needle.length; i++) {

		pattern = findSuffixInArray(suffix, haystack);
		if((pattern.frequency > 0) && (pattern.frequency > previous.frequency)) {
			result = addPatternsToArray(pattern, result);
		}

		suffix = removeFirstLetter(suffix);
		previous = pattern;
	}

	return result;
};

var findSuffixInArray = exports.findSuffixInArray = function(pattern, arr) {
	var suffix, result = {pattern: pattern, frequency: 0};
	for(var i = 0; i < arr.length; i++) {
		suffix = arr[i].slice(-pattern.length);
		if(suffix == pattern) result.frequency += 1;
	}
	return result;
};

var findPatternInArray = exports.findPatternInArray = function(pattern, arr) {
	var result = {pattern: pattern, frequency: 0};
	var rx = new RegExp(pattern, 'i');
	for(var i = 0; i < arr.length; i++) {
		if(arr[i].search(rx) !== -1) result.frequency += 1;
	}
	return result;
};

var addPatternsToArray = exports.addPatternsToArray = function(pattern, arr) {
	var i, j, index = -1;
	if(!(pattern instanceof Array)) pattern = [pattern];
	for(i = 0; i < pattern.length; i++) {

		// Find index of pattern in array.
		for(j = 0; j < arr.length; j++) {
			// For all patterns in argument, check if pattern is the same
			// as another pattern in the array. If it is, set the index to
			// be this element.
			if(arr[j].pattern === pattern[i].pattern) index = j;
		}
		// If not found, add a new item.
		if(index == -1) arr.push(pattern[i]);
		// Otherwise, just add up the frequencies.
		else {
			console.log("here");
			arr[index].frequency += pattern[i].frequency;
		}

	}
	// And return.
	return arr;
};

var reduceFrequency = exports.reduceFrequency = function(arr) {
	var i, min = arr[0].frequency;
	// Find the minimum frequency.
	for(i = 0; i < arr.length; i++) {
		if(arr[i].frequency < min) {
			min = arr[i].frequency;
		}
	}
	min = min - 1;
	// Reduce.
	for(i = 0; i < arr.length; i++) {
		arr[i].frequency -= min;
	}
	return arr;
};

var removeSingleLetterPatterns = exports.removeSingleLetterPatterns = function(arr) {
	var result = [];
	for(var i = 0; i < arr.length; i++) {
		if(arr[i].pattern.length > 1) result.push(arr[i]);
	}
	return result;
};

var removeSingleFrequencyPatterns = exports.removeSingleFrequencyPatterns = function(arr) {
	var result = [];
	for(var i = 0; i < arr.length; i++) {
		if(arr[i].frequency > 1) result.push(arr[i]);
	}
	return result;
};

var shear = exports.shear = function(arr, num) {
	for(var i = 0; i < num; i++) {
		arr = reduceFrequency(arr);
		arr = removeSingleFrequencyPatterns(arr);
	}
	return arr;
};