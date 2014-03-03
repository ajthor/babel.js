var _ = require("lodash");

describe("word", function() {

	var word;

	it("should load without throwing", function() {
		expect(function() {
			word = require("../word.js");
		}).not.toThrow();
	});

	// it("should load without throwing", function() {
	// 	var instance = new word();
	// 	instance.set(23, "hello");
	// 	instance.set("name", "Jones");
	// 	instance.set({age: 42, gender: "male"});

	// 	expect(instance.attributes).not.toEqual({});
	// 	expect(instance.get("name")).toBe("Jones");
		
	// });

	it("should have some word attributes not found in model", function() {
		var instance = new word("hello");

		// expect(instance.attributes.word).toBeDefined();
		// expect(instance.attributes.category).toBeDefined();

		console.log(instance);
		
	});

});