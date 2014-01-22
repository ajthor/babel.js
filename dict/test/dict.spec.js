var _ = require("underscore");
var word = require("../../word/word.js");

describe("dict", function() {

	var dict;

	it("should load without throwing", function() {
		expect(function() {
			dict = require("../dict.js");
		}).not.toThrow();
	});

	it("should contain an array of items", function() {
		var instance = new dict();
		expect(instance._byId).not.toBeUndefined();
	});

	it("should contain a collection of objects", function() {
		var instance = new dict();
		expect(instance.objects).not.toBeUndefined();
	});

});