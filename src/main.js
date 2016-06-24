'strict mode';

require('./main.less');

var angular = require('angular');
require('angular-material');
require('angular-route');
require('angular-sanitize');

var mainState = require('./state');

// My module!
var jslip = angular.module('jslip', ['ngMaterial', 'ngRoute', 'ngSanitize']);

// Ctrls
var packageFinderTpl = require('./packageFinder/packageFinder.tpl.jade');
jslip.controller('packageFinder', ['$scope', 'mainState', '$mdSidenav', require('./packageFinder/ctrl')]);

//  Directives
jslip.directive('del', [require('./widgets/del/directive')]);

jslip.directive('cm', [require('./widgets/cm/directive')])

// Routes
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




// Publish dom object @todo do I like this
window.dom = document.getElementById('dom');
