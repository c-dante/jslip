'use strict';

require('./style.less');

var _ = require('lodash');

var PackageFinder = function(scope, state){
	this.state = {};

	var update = () => {
		this.state.packages = state.getState().packages;
		scope.$applyAsync();
		console.log(this.state.packages);
	}

	state.subscribe(() => update);
	update();
};

PackageFinder.prototype.addLib = function(){
	console.log(this.newName, this.newPath);
};

module.exports = PackageFinder;
