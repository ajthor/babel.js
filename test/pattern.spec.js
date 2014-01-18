var word = require("../word.js");

describe("pattern", function() {

	var pattern;

	it("should load without throwing", function() {
		expect(function() {
			pattern = require("../pattern.js");
		}).not.toThrow();
	});

	it("match should work", function() {
		
		var test = new pattern(/(?:\bhave\W+)(?:\W+|\w+){1,6}(\b\w+ing)/);

		// console.log(test.exec("you have always been doing", "fierce", "balloon", "are ballooning", function(match) {
		// 	console.log(match[1]);
		// }));

	});

	// it("equals should work", function() {
	// 	var p1 = pattern(function() {
	// 		var args = Array.prototype.slice.call(arguments);
	// 		var match = [new word("Hello"), null, new word("man")];
	// 		console.log(args);
	// 		console.log(match);
	// 	});

	// 	p1("Hello", null, "man");
	// });

});