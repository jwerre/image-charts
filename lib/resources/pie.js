'use strict';

const Resource = require('../resource');

class Pie extends Resource {
	

	constructor(api, options) {
		options.type = 'p';
		
		// if there are mulitple data sets make it a concentric pie chart
		if (options.data && options.data.length > 1 && Array.isArray(options.data[1])) {
			options.type = 'pc';
		}
		
		super(api, options);
	}
	
	
}

module.exports = Pie;
