var distance = module.exports = function(str1, str2) {
	var i, j, distance;

	// Initialize matrix.
	var matrix = [];
	for(i = 0; i < str1.length+1; i++) {
		matrix[i] = [];
		for(j = 0; j < str2.length+1; j++) {
			matrix[i][j] = 0;
		}
	}

	for(i = 1; i < str1.length+1; i++) matrix[i][0] = i;
	for(i = 1; i < str2.length+1; i++) matrix[0][i] = i;

	// Find distance.
	for(i = 1; i < str1.length+1; i++) {
		
		for(j = 1; j < str2.length+1; j++) {
			// console.log(str1[i-1], str2[j-1]);

			if(str1[i-1] === str2[j-1]) matrix[i][j] = matrix[i-1][j-1];
			else {
				matrix[i][j] = Math.min(
						matrix[i-1][j] + 1,
						matrix[i][j-1] + 1,
						matrix[i-1][j-1] + 1
					);
			}

		}

	}

	// console.log(matrix);
	return matrix[i-1][j-1];
	
};