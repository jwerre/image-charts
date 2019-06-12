'use strict';

const Resource = require('../resource');

class Polar extends Resource {
	

	constructor(api, options) {
		options.type = 'pa';
		super(api, options);
	}
	
	
}

module.exports = Polar;
