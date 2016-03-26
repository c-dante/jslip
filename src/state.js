'use strict';

var Redux = require('redux');

var state = Redux.createStore((x) => {
	return x;
});

module.exports = state;