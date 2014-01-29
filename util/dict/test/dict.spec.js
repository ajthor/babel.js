var _ = require("underscore");
var word = require("../../word/word.js");
var collection = require("backbone-node").collection;

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

	it("lookup should work", function() {
		var instance = new dict();

		var a = new word("hello");
		var b = new word("there");
		var c = new word("cruel");
		var d = new word("world");
		
		instance.add([a, b, c, d]);

		a.set("word", "something");

		expect(instance.lookup("something").attributes.word).toBe("something");
	});

});