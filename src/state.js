'use strict';

var Redux = require('redux');



// Base state
var pkg = (name, path, alias = undefined, isUser = false) => {
	return {
		name, path, isUser, alias,
		isEnabled: false
	};
};

var packages = [
	pkg('lodash', 'https://rawgit.com/lodash/lodash/master/dist/lodash.min.js', '_'),
	pkg('flyd', 'https://rawgit.com/paldepind/flyd/master/flyd.js')
];


var packageList = (state = [], event) => {
	switch (event.type)
	{
		case 'addPackage':
			state.push(pkg(event.pkg.name, event.pkg.path, event.pkg.alias, true));
			break;
	}

	return state;
};



var state = Redux.createStore(Redux.combineReducers({
	packageList
}), {
	packageList: packages
});





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
})



module.exports = state;
