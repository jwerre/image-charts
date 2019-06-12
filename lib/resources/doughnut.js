'use strict';

const Resource = require('../resource');

class Pie extends Resource {
	

	constructor(api, options) {
		options.type = 'pd';
		super(api, options);
	}
	
	
}

module.exports = Pie;
