import './style.less';
import run from './run'

const CACHE_KEY = '';
const defaultValue = `/**
 * Use ES6 import.
 *
 * Modifiy module alias object in the package.json file.
 * 
 * Your code is run in an eval loop.
 *
 * System Loader (systemjs) is used to evaluate, via searching cdnjs
 */

import _ from 'lodash';

console.log(_);

console.log([
	1, 2, 3, 5, 7, 9
]);

console.log(_.map([1, 2, 3], x => x*2));`;

const state = {
	buffers: [[]],
	activeBuffer: defaultValue,
};

class EditorCtrl {
	constructor($scope, babel) {
		console.log($scope, babel);
		this.babel = babel;
		this.last = '';
	}

	registerEditor(cm) {
		console.log(cm);
		cm.setValue(state.activeBuffer);

		setInterval(() => {
			this.parse(cm.getValue());
		}, 5000);
		this.parse(cm.getValue());
	}

	parse(str) {
		if (this.last !== str) {
			this.parsed = this.babel.transform(str, {
				presets: ['es2015'],
				comments: false,
			});
			const require = (...args) => console.log('Require', args);
			console.log(this.parsed);
			run(this.parsed.code)(require);
		}
		this.last = str;
	}

}

export default EditorCtrl;
