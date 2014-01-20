describe("collection", function() {

	var collection;

	it("should load without throwing", function() {
		expect(function() {
			collection = require("../collection.js");
		}).not.toThrow();
	});

	it("create should work", function() {
		var c = new collection({item: "", frequency: 1});

		c.add("er", 3);
		c.add("er", 2, function(obj, val, key) {
			if(key !== "frequency") return;
			else obj[key] += val;
		});

		expect(c._items[0].frequency).toBe(5);
		
	});

});