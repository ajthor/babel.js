describe("search", function() {

	var search;

	it("should load without throwing", function() {
		expect(function() {
			search = require("../search.js");
		}).not.toThrow();
	});

	it("should run search without throwing", function() {
		expect(function() {

			// search("How now homey brown cow.").for.every.suffix(function(value) {
			// 	console.log(value);
			// });

			// console.log(suffixes);

		}).not.toThrow();
	});

});