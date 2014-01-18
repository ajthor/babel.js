var input = module.exports = function(input, options) {
	if(!input) return;
	options || (options = {});
	if(options.unique === undefined) options.unique = true;

	var i, j, words = [], sentences = input.split(/\.\s/);
	if(options.sentences) return sentences;
	// Create words array.
	for(i = 0; i < sentences.length; i++) {
		words[i] = (function() {
			var result; 
			result = sentences[i].split(/\s+/);
			// Remove punctuation.
			for(j = 0; j < result.length; j++) {
				result[j] = result[j].replace(/[^a-zA-Z\']/g, '');
				result[j] = result[j].toLowerCase();
			}
			return result;
		})();
	}
	// Collapse words into unique array.
	if(options.unique) {
		words = words.concat.apply([], words);
		words = words.filter(function(elem, pos) {
		    return words.indexOf(elem) == pos;
		});
	}

	return words;	

};