describe("word", function() {

	var word;

	it("should load without throwing", function() {
		expect(function() {
			word = require("../word.js");
		}).not.toThrow();
	});

	it("match should work", function() {
		
		var result = new word("hello", {root: "hel", related: ["456234626"]});

		// console.log(result);

	});

});