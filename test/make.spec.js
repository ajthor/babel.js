describe("make", function() {

	var make;

	it("should load without throwing", function() {
		expect(function() {
			make = require("../make.js");
		}).not.toThrow();
	});

});