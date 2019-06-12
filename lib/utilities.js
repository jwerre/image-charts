'use strict';

exports.camelCase = function (text) {

	return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function(match, p1, p2, offset) {
		
		if (p2) {
			return p2.toUpperCase();
		}
		
		return p1.toLowerCase();
		
	});

};
