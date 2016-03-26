'use strict';

var Redux = require('redux');



// Base state
var pkg = (name, path) => { return { name, path }; };
var packages = [
	pkg('lodash', 'https://rawgit.com/lodash/lodash/master/dist/lodash.min.js'),
	pkg('lodash-fp', 'https://rawgit.com/lodash/lodash/master/dist/lodash.fp.min.js'),
	pkg('flyd', 'https://rawgit.com/paldepind/flyd/master/flyd.js')
];





var state = Redux.createStore((state, event) => {
	return state;
}, {
	packages
});




module.exports = state;
