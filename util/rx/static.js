var _any = exports._any = function(args) {
	var result = this.working;
	result.push(args);
	return this._make(result);
};

var d = exports.d = function(args) {
	return this._any((args || "\\d"));
};

var s = exports.s = function(args) {
	return this._any((args || "\\s"));
};

var w = exports.w = function(args) {
	return this._any((args || "\\w"));
};

var b = exports.b = function(args) {
	return this._any((args || "\\b"));
};

var word = exports.word = function(args) {
	return this._any((args ? ((args.get) ? args.get() : args) : "\\w+\\W+"));
};

var characters = exports.characters = function(args) {
	return this._any("[" + (args ? ((args.get) ? args.get() : args) : "A-Za-z0-9_") + "]");
};

var D = exports.D = function(args) {
	return this._any((args || "\\D"));
};

var S = exports.S = function(args) {
	return this._any((args || "\\S"));
};

var W = exports.W = function(args) {
	return this._any((args || "\\W"));
};

var B = exports.B = function(args) {
	return this._any((args || "\\B"));
};

var cgroup = exports.cgroup = function(args) {
	return this._any("(" + (args ? ((args.get) ? args.get() : args) : "") + ")");
};

var ncgroup = exports.ncgroup = function(args) {
	return this._any("(?:" + (args ? ((args.get) ? args.get() : args) : "") + ")");
};

var followedBy = exports.followedBy = function(args) {
	return this._any("(?=" + (args ? ((args.get) ? args.get() : args) : "") + ")");
};

var notFollowedBy = exports.notFollowedBy = function(args) {
	return this._any("(?!" + (args ? ((args.get) ? args.get() : args) : "") + ")");
};

var or = exports.or = function(args) {
	return this._any("|" + (args ? ((args.get) ? args.get() : args) : ""));
};

var n = exports.n = function(m, n) {
	return this._any("{" + ((n) ? m+","+n : m) + "}");
};

var except = exports.start = exports.except = function(args) {
	return this._any("^" + (args ? ((args.get) ? args.get() : args) : ""));
};

var end = exports.end = function(args) {
	return this._any((args ? ((args.get) ? args.get() : args) : "") + "$");
};

var orMore = exports.orMore = function(args) {
	return this._any((args ? ((args.get) ? args.get() : args) : "") + "+");
};

var few = exports.few = function(args) {
	return this._any((args || "?"));
};

var saved = exports.saved = function(args) {
	return this._any((args || "\\1"));
};


