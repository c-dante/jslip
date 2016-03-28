'use strict';

require('./style.less');

const FRESH = 1;
const WAIT = 1 << 1;
const END = 1 << 2;

var DelCtrl = function(scope) {
	this.state = FRESH;
	this.delay = this.delay || 2000;
	this.delayTimeout;
	Object.assign(this, { FRESH, WAIT, END });
};

DelCtrl.prototype.start = function() {
	this.delayTimeout = setTimeout(() => this.end(), this.delay);
	this.onStart({});
};

DelCtrl.prototype.cancel = function() {
	if (this.delayTimeout){
		clearInterval(this.delayTimeout);
	}
	this.delayTimeout = undefined;
	this.onCancel({});
};

DelCtrl.prototype.end = function() {
	this.state = END;
	this.delayTimeout = undefined;
	this.onEnd({});
};

DelCtrl.prototype.clickX = function() {
	switch (this.state)
	{
		case FRESH:
			this.state = WAIT;
			this.start();
			break;
		case WAIT:
			this.state = FRESH;
			this.cancel();
			break;
	}
};

module.exports = function() {
	return {
		template: require('./del.tpl.pug'),
		scope: {},
		bindToController: {
			onEnd: '&',
			onStart: '&',
			onCancel: '&',
			delay: '=?'
		},
		controller: ['$scope', DelCtrl],
		controllerAs: 'delCtrl'
	};
};