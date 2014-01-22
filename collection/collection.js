var _ = require("underscore");

var collection = module.exports = function(template, objects, options) {
	options || (options = {});
	if(!_.isObject(template)) template = {};
	this._byId = {};
	this.objects = [];
	if(objects) this.add(objects, options);
};

// collection.__proto__ = require("./static.js");

_.extend(collection.prototype, {
	// Sorted array of items.
	_byId: {},
	// Copy of _items with hash keys for quick searches.
	objects: [],

	// The template object to be used to create new item
	// instances which are kept in this collection.
	_template: {},
	// The factory for template objects.
	_factory: function() {
		var parent = this._template;
		var child;

		child = function(args) { return parent.apply(this, args); };
		child.prototype = parent.prototype;

		child.__super__ = parent.prototype;

		return child;
	},
	_prepareObject: function(args) {
		if(args instanceof this._template) {
			if(!args.collection) args.collection = this;
			if(!args.id) args.id = _.uniqueId();
			if(!args.hash) args.hash = this.hash();
			return args;
		}
		// Not the same as template.
		var obj = this._factory();
		var instance = new obj(arguments);

		instance.collection = this;
		if(!instance.id) instance.id = _.uniqueId();
		if(instance.primaryKey) {
			instance.hash = this.hash(instance.id + instance[instance.primaryKey]);
		}
		else instance.hash = this.hash(instance.id);

		return instance;
	},

	create: function() {
		var obj;
		if(!(obj = this._prepareObject.apply(this, arguments))) return false;
		this.add(obj);
		return obj;
	},

	// CRUD functions (including add, minus delete).
	add: function(args) {
		// Add to both collections.
		this.set(args, {add: true, update: true, remove: false});
		return this;
	},
	remove: function(args) {
		// Remove from both collections.
		this.set(args, {add: false, update: false, remove: true});
		return this;
	},

	merge: function(args) {
		// Add each individual item to the collection.
	},

	get: function(args) {
		if(args == null) return void 0;
		return this._byId[args.id] || this._byId[args];
	},
	set: function(args, options) {
		if(args instanceof collection) {
			this.merge(collection);
			return this;
		}
		options || (options = {});
		var toAdd = [];
		var toRemove = [];
		// Add by id.
		// Add to sorted array.
		if(!Array.isArray(args)) args = [args];
		args.forEach(function(item, key) {

			var obj, exists;
			var id = item.id;

			if(exists = this.get(id)) {
				// Exists. Update.
				if(options.update) {
					exists = item;
					obj = _.find(this.objects, {id: id});
					obj = item;
				}
				else if(options.remove) {
					toRemove.push(exists);
				}
				
			}
			else {
				// Doesn't exist. Add.
				if(options.add) {
					obj = this._prepareObject(item);
					toAdd.push(obj);
				}
			}

		}, this);

		if(toAdd.length > 0) {
			_.forEach(toAdd, function(item) {
				// Sort
				this.objects.push(item);
				this._byId[item.id] = item;

			}, this);
		}

		if(toRemove.length > 0) {
			_.forEach(toAdd, function(item) {
				// Remove

			}, this);
		}
		return this;
	},

	clone: function() {
      return new this.constructor(this.models);
    },

	// Return object when passed an id.
	at: function(index) {
		return this.objects[index];
	},
	// Function to create the hashes used in identifying the result.
	hash: function(str) {
		if(!str) return void 0;
		var hash = 0, i, ch;
		for (i = 0, l = str.length; i < l; i++) {
		    ch  = str.charCodeAt(i);
		    hash  = ((hash<<5)-hash)+ch;
		    hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}

});


