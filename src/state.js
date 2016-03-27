'use strict';

var _ = require('lodash');
var Redux = require('redux');
var search = require('./search');

const STORAGE_KEY = '_pkg';


// Base state
var pkg = (name, path, alias = undefined, isUser = false) => {
	return {
		name, path, isUser, alias,
		isEnabled: false
	};
};

var throttleSave = _.throttle((state) => {
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}, 500);

var packageList = (state = [], event) => {
	switch (event.type)
	{
		case 'addPackageList':
			state.push(...event.packages);
			throttleSave(state);
			break;
		case 'addPackage':
			state.push(pkg(event.pkg.name, event.pkg.path, event.pkg.alias, true));
			throttleSave(state);
			break;
	}
	return state;
};



var state = Redux.createStore(Redux.combineReducers({
	packageList
}), {
	packageList: []
});




// Loader
var System = require('systemjs');

var cache = {};
state.subscribe(() => {
	var s = state.getState();

	s.packageList.forEach((item) => {
		var key = item.alias || item.name;

		if (item.isEnabled)
		{
			if (!cache[key])
			{
				cache[key] = [];
			}
			cache[key].push(window[key]);

			System.import(item.path).then((x) => {
				window[key] = x;
			});
		}
		else
		{
			window[key] = (cache[key] || []).pop();
		}
	});
});



// Storage state
var saveState = window.localStorage.getItem(STORAGE_KEY);
if (!saveState)
{
	Promise.all(['lodash', 'moment'].map(search.autocomplete))
	.then(
		(x) => state.dispatch({
			type: 'addPackageList',
			packages: x.map(_.first).map((x) => pkg(x.name + '(' + x.version + ')', x.path, x.alias)) })
	);

	state.dispatch({ type: 'addPackage', pkg: pkg('flyd (master)', 'https://rawgit.com/paldepind/flyd/master/flyd.js', 'flyd')})
}
else
{
	state.dispatch({ type: 'addPackageList', packages: JSON.parse(saveState) })
}


module.exports = state;
