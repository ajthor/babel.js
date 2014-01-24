var _ = require("underscore");

describe("occurrence", function() {

	var occurrence;

	it("should load without throwing", function() {
		expect(function() {
			occurrence = require("../occurrence.js");
		}).not.toThrow();
	});

	it("should load without throwing", function() {
		var instance = new occurrence(['ae', 'ei', 'ui', 'ae', 'ae', 'ou', 'ie', 'ie']);

		// console.log(instance.significant());
	});

});