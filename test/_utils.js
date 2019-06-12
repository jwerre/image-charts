const fs = require('fs');
const { exec } = require('child_process');


exports.openImg = async function (src, options={}) {
	

	let file = src;
	
	if (!options.openSource) {

		file = `/tmp/chart-${(new Date().getTime()).toString(36)}.html`;
		
		let img = `<img src="${src}"`;
		
		if (options.width) {
			img += ` width="${options.width}"`;
		}

		if (options.height) {
			img += ` height="${options.height}"`;
		}
		
		img += '>';

		await fs.promises.writeFile(file, img);
	}
	
	const cmd = `open -a "/Applications/Google Chrome.app" ${file}`;
	
	return new Promise( function(resolve, reject) {
		exec(cmd, (err, stdout, stderr) => {
			
			if (err) {
				return reject(err.toString());
			}
			
			resolve(stdout);
		});

	});

};
