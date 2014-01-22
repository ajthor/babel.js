var word = require("../../word/word.js");

describe("pattern", function() {

	var pattern;

	it("should load without throwing", function() {
		expect(function() {
			pattern = require("../pattern.js");
		}).not.toThrow();
	});

	it("match should work", function() {
		
		var test = new pattern(/(?:\bhave\W+)(?:\W+|\w+){1,6}(\b\w+ing)/);

		test.exec("you have always been doing", "fierce", "balloon", "are ballooning", function(match) {
			console.log(match);
		});

		console.log(test);
		console.log(test.attributes);

	});

});