describe("interpret", function() {

	var interpreter;
	var text = "This is the closest I will ever come to writing an autobiography. I have called it \"Slapstick\" because it is grotesque, situational poetry--like the slapstick film comedies, especially those of Laurel and Hardy, of long ago.";


	it("should load without throwing", function() {
		expect(function() {
			interpreter = require("../interpret.js");
		}).not.toThrow();
	});

	it("should parse input into workable array", function() {
		expect(function() {

			var test = new interpreter(text);

		}).not.toThrow();
	});

});