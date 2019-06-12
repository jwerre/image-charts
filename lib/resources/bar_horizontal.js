'use strict';

const Resource = require('../resource');

class BarHorizontal extends Resource {


	constructor(api, options) {

		options.type = 'bhg';
		
		if (options.stacked) {
			options.type = 'bhs';
		}
		
		super(api, options);

	}
	
	
}

module.exports = BarHorizontal;
