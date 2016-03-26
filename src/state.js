'use strict';

var Redux = require('redux');



// Base state
var pkg = (name, path, isUser = false) => { return { name, path, isUser }; };
var packages = [
	pkg('lodash', 'https://rawgit.com/lodash/lodash/master/dist/lodash.min.js'),
	pkg('lodash-fp', 'https://rawgit.com/lodash/lodash/master/dist/lodash.fp.min.js'),
	pkg('flyd', 'https://rawgit.com/paldepind/flyd/master/flyd.js')
];




var System = require('systemjs');
packages.map((pkg) => System.import(pkg.path).then(
	(lib) => {
		console.log(pkg.name, lib);
	}
));




var state = Redux.createStore((state, event) => {
	return state;
}, {
	packages
});




module.exports = state;
