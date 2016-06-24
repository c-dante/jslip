'use strict';

require('./style.less');

var _ = require('lodash');
var search = require('../search');

var newPkg = () => {
	return {
		name: '',
		path: '',
		alias: ''
	};
};

var PackageFinder = function(scope, state, mdSidenav){
	this.state = state;
	this.mdSidenav = mdSidenav;
	this.scope = scope;

	this.docsOpen = false;

	this.log = [];

	this.new = newPkg();
	this.shouldGen = true;

	var update = () => {
		this.packages = state.getState().packageList;
		scope.$applyAsync();
	}

	state.subscribe(() => update);
	update();
};

PackageFinder.prototype.toggleDocs = function() {
	this.docsOpen = !this.docsOpen;
	if (!this.firstDocsOpen && this.docsOpen) {
		this.firstDocsOpen = true;
	}
}

var throttleSearch = _.throttle(search.autocomplete, 250);

PackageFinder.prototype.search = function(name){
	return throttleSearch(name);
};

PackageFinder.prototype.pickPackage = function(pkg){
	if (!pkg) return;

	this.new.name = this.selectedPackage.name + ' ' + this.selectedPackage.version;
	this.new.alias = this.selectedPackage.alias || this.selectedPackage.name;
	this.new.path = this.selectedPackage.path;
	this.shouldGen = false;
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

PackageFinder.prototype.removeLib = function(lib, index) {
	this.state.dispatch({ type: 'removePackage', index });
};

PackageFinder.prototype.addLib = function() {
	if (this.new.path && this.new.name)
	{
		this.state.dispatch({ type: 'addPackage', pkg: this.new });
		this.new = newPkg();
		this.shouldGen = true;
	}
};


PackageFinder.prototype.cmInit = function(cm) {
	console.log('Oh hey cm', cm);
};

module.exports = PackageFinder;
