var word = require("../word.js");

describe("dict", function() {

	var dict;

	it("should load without throwing", function() {
		expect(function() {
			dict = require("../dict.js");
		}).not.toThrow();
	});

	it("add should work", function() {
		
		var result = new dict();

		result.add("Hello");
		result.add("there");
		result.add("my");
		result.add("good");
		result.add("fellow");

		// console.log(result.dict);

	});

});