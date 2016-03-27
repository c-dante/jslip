'use strict';

var rest = require('rest');
var mime = require('rest/interceptor/mime');

var client = rest.wrap(mime, { mime: 'application/json' });

var parseAlgolia = (doc) => {
	return Object.assign({
		path: `https://cdnjs.cloudflare.com/ajax/libs/${doc.name}/${doc.version}/${doc.filename}`,
		alias: doc.namespace,
	}, doc);
};

var autocomplete = (str) => client({
	path: 'https://2qwlvlxzb6-dsn.algolia.net/1/indexes/libraries/query',
	method: 'POST',
	params: {
		'x-algolia-api-key': '2663c73014d2e4d6d1778cc8ad9fd010',
		'x-algolia-application-id': '2QWLVLXZB6'
	},
	entity: {
		params:"query="+str
	}
}).then(
	(res) => res.entity.hits.map(parseAlgolia)
);

module.exports = {
	autocomplete
};
