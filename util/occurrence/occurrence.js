var _ = require("lodash");

var occurrence = module.exports = function(arr) {
	if(!(this instanceof occurrence)) return this(arr);
	var i = 0, result = [];
	this.set(arr);
};

_.extend(occurrence.prototype, {

	_items: [],

	get: function(key) {
		if(!key) return this._items;
		if(_.isObject(key)) return _.find(this._items, key);
		else return this._items[key];
	},

	set: function(arr) {
		if(!(Array.isArray(arr))) arr = [arr];
		arr.forEach(function(item) {
			var exists;
			if(exists = this.get({key: item})) {
				exists.frequency += 1;
			}
			else {
				this._items.push({key: item, frequency: 1});
			}
		}, this);
	},

	significant: function(modifier) {
		if(!modifier) modifier = 1;
		var max = _.max(this._items, 'frequency').frequency;
		var min = _.min(this._items, 'frequency').frequency;
		
		var avg = (function() {
			var result = 0;
			this._items.forEach(function(item) {result += item.frequency;});
			return result/this._items.length;
		}.bind(this))();

		console.log(max, min, avg);

		return _.filter(this._items, function(item) {
			return ((item.frequency > avg*modifier) && (item.key.length > 1));
		});
	},

	filter: function(cb) {
		if(!cb) return null;
		return _.filter(this._items, function(item, index) {
			return !!(cb(item, index));
		});
	}

});


