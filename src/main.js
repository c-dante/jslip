'strict mode';

var _ = require('lodash');

require('./main.less');

let seenBabel = false;
const getBabel = _.constant(new Promise((ok, fail) => {
	const loop = () => {
		if (window.Babel) {
			ok(window.Babel);
		} else {
			setTimeout(loop, 100);
		}
	}
	loop();
}));

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

var editorTpl = require('./editor/tpl.jade');
jslip.controller('editor', ['$scope',  'babel', require('./editor/ctrl').default]);

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
	}).when('/editor', {
		controller: 'editor',
		controllerAs: '$ctrl',
		template: editorTpl,
		resolve: {
			babel: getBabel
		},
	});

	routes.otherwise('/');
}]);


angular.element(document).ready(() => {
	angular.bootstrap(document, ['jslip']);
});


// Publish dom object @todo do I like this
window.dom = document.getElementById('dom');
