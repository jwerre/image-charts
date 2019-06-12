'use strict';

const Resource = require('../resource');

class Bar extends Resource {


	constructor(api, options) {
		options.type = 'bvg';

		if (options.stacked) {
			options.type = 'bvs';
		}

		super(api, options);
	}
	
	
}

module.exports = Bar;
