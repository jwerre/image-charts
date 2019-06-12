'use strict';

const Resource = require('../resource');

class Bubble extends Resource {
	

	constructor(api, options) {
		options.type = 'bb';
		
		super(api, options);
	}
	
	
}

module.exports = Bubble;
