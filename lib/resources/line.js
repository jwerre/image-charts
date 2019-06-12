'use strict';

const Resource = require('../resource');

class Line extends Resource {


	constructor(api, options) {
		options.type = 'lc'
		super(api, options);
	}
	
	
}

module.exports = Line;
