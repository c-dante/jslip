'use strict';

require('./style.less');

const CodeMirror = require('codemirror');

require('codemirror/addon/lint/lint')
require('codemirror/addon/lint/javascript-lint')
require('codemirror/mode/javascript/javascript')

var CmCtrl = function(scope, editor) {
	scope.$on('$destroy', (...args) => onDestroy(...args));
};

CmCtrl.prototype.init = function(editor) {
	this.onInit({ cm: editor });
};

module.exports = function() {
	return {
		scope: {},
		bindToController: {
			onInit: '&',
			onDestroy: '&',
		},
		link(scope, elt, attr, ctrl) {
			setTimeout(() => {
				const editor = new CodeMirror(elt[0], {
					lineNumbers: true,
					lineWrapping: true,
					mode: "javascript",
					gutters: ["CodeMirror-lint-markers"],
					lint: true,
					tabSize: 2,
				});
				ctrl.init(editor);
			});
		},
		controller: ['$scope', CmCtrl],
		controllerAs: '$ctrl'
	};
};