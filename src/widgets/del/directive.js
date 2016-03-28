'use strict';

const FRESH = 1;
const WAIT = 1 << 1;
const END = 1 << 2;

var DelCtrl = function(scope) {
	this.state = FRESH;
	this.delay = this.delay || 500;
	this.delayTimeout;
};

DelCtrl.prototype.cancel = function() {
	if (this.delayTimeout){
		clearInterval(this.delayTimeout);
	}
	this.delayTimeout = undefined;
	this.onCancel({});
};

DelCtrl.prototype.end = function() {
	console.log(this);
	this.delayTimeout = undefined;
};

DelCtrl.prototype.clickX = function() {
	switch (this.state)
	{
		case FRESH:
			this.state = WAIT;
			this.onStart({});
			this.delayTimeout = setTimeout(() => this.end(), this.delay);
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