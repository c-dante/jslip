'use strict';

require('./style.less');

var _ = require('lodash');

var newPkg = () => {
	return {
		name: '',
		path: '',
		alias: ''
	};
};

var PackageFinder = function(scope, state){
	this.state = state;
	this.new = newPkg();
	this.shouldGen = true;

	var update = () => {
		this.packages = state.getState().packageList;
		scope.$applyAsync();
	}

	state.subscribe(() => update);
	update();
};

PackageFinder.prototype.updateName = function(){
	this.shouldGen = false;
};

var pathRx = /\/([^\/\\]+)\.js$/;
PackageFinder.prototype.updatePath = function(){
	var r = pathRx.exec(this.new.path);
	if (this.shouldGen && r)
	{
		var gen = r[1].split('.min')[0];
		if (gen)
		{
			this.new.name = gen;
		}
	}
};

PackageFinder.prototype.toggleLib = function(lib) {
	this.state.dispatch({ type: 'enabled' });
};

PackageFinder.prototype.addLib = function() {
	if (this.new.path && this.new.name)
	{
		this.state.dispatch({ type: 'addPackage', pkg: this.new });
		this.new = newPkg();
		this.shouldGen = true;
	}
};

module.exports = PackageFinder;
