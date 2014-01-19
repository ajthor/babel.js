describe("collection", function() {

	var collection;

	it("should load without throwing", function() {
		expect(function() {
			collection = require("../collection.js");
		}).not.toThrow();
	});

	it("create should work", function() {
		var c = new collection("item", "frequency");

		console.log(c.create("er", 3));
	});

});