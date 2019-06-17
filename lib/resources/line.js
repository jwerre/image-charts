'use strict';

const Resource = require('../resource');

class Line extends Resource {


	constructor(api, options) {

		options.type = 'lc';
		
		if (options.hideAxis) {
			options.type += ':nda';
			
			delete options.hideAxis;
		}
		
		super(api, options);
	}
	
	
}

module.exports = Line;
