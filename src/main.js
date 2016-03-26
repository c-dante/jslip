'strict mode';

require('./main.less');

var angular = require('angular');
require('angular-material');
require('angular-route');

var mainState = require('./state');

var jslip = angular.module('jslip', ['ngMaterial', 'ngRoute']);

jslip.controller('packageFinder', ['$scope', 'mainState', require('./packageFinder/ctrl')]);
var packageFinderTpl = require('./packageFinder/packageFinder.tpl.jade');

jslip.config(['$routeProvider', (routes) => {

	routes.when('/', {
		controller: 'packageFinder',
		controllerAs: 'packageFinder',
		template: packageFinderTpl,
		resolve: {
			mainState: () => mainState
		}
	});

	routes.otherwise('/');
}]);
