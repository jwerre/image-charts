'use strict';

const os = require('os'),
	fs = require('fs'),
	path = require('path'),
	{camelCase} = require('./utilities');
	
const CONFIG_FILE = process.env.IMAGE_CHARTS_AUTH || path.resolve(os.homedir(), '.image_charts.json');
const RESOURCES_DIR = './resources';
const DEFAULT_PROTOCOL = 'https';
const DEFAULT_HOST = 'image-charts.com';
const DEFAULT_PATH = 'chart';
const DEFAULT_PORT = '443';
const DEFAULT_API_VERSION = 1;
// Uses node's default timeout: require('http').createServer().timeout;
const DEFAULT_TIMEOUT = 120000;
const VERSION = require('../package.json').version;
const USER_AGENT = {
	bindings_version: VERSION,
	lang: 'node',
	lang_version: process.version,
	platform: process.platform,
	publisher: 'ImageCharts',
	account: null,
};
// In case there are any resources that don't need to be loaded.
const IGNORED_RESOURCES = [];

let resources = {},
	config = {};

if ( fs.existsSync(CONFIG_FILE) ) {
	config = require(CONFIG_FILE);
}


fs.readdirSync(path.resolve(__dirname, RESOURCES_DIR))
	.forEach(function(file) {

		let key = camelCase( path.basename(file, '.js') );
		
		if (!IGNORED_RESOURCES.includes(file)) {
			resources[key] = require( path.resolve(__dirname, RESOURCES_DIR, file) );
		}

	});

class ImageCharts {
	
	constructor(options={}) {
		
		this._api = {
			account: options.id || config.account || process.env.IMAGE_CHARTS_ID,
			secret: options.secret || config.secret || process.env.IMAGE_CHARTS_SECRET,
			version: options.version || config.version || ImageCharts.DEFAULT_API_VERSION,
			host: options.host || ImageCharts.DEFAULT_HOST,
			port: options.port || ImageCharts.DEFAULT_PORT,
			path: options.path || ImageCharts.DEFAULT_PATH,
			protocol: options.protocol || ImageCharts.DEFAULT_PROTOCOL,
			timeout: options.timeout || config.timeout || ImageCharts.DEFAULT_TIMEOUT,
			agent: ImageCharts.USER_AGENT,
			env: process.env.NODE_ENV === 'development',
		};
		
		this._api.agent.account = this._api.account;
		
		this._prepResources();

	}

	static get DEFAULT_PROTOCOL () { return DEFAULT_PROTOCOL; }
	
	static get DEFAULT_HOST () { return DEFAULT_HOST; }
	
	static get DEFAULT_PORT () { return DEFAULT_PORT; }
	
	static get DEFAULT_PATH () { return DEFAULT_PATH; }
	
	static get DEFAULT_API_VERSION () { return DEFAULT_API_VERSION; }
	
	static get DEFAULT_TIMEOUT () { return DEFAULT_TIMEOUT; }
	
	static get VERSION () { return VERSION; }
	
	static get USER_AGENT () { return USER_AGENT; }

	static instance (options) {
		return new ImageCharts(options);
	}

	getApiField(key) {
		return this._api[key];
	}

	set host (host) {
		if (host) {
			this._api.host = host;
		}
	}

	set protocol (protocol) {
		this._api.protocol = protocol.toLowerCase();
	}

	set port (port) {
		this._api.port = port;
	}

	set path (path) {
		this._api.path = path;
	}

	set version (version) {
		if (version) {
			this._api.version = version;
		}
	}

	set secret (key) {
		this._api.secret = key;
	}

	set account (id) {
		this._api.account = id;
	}

	set timeout (timeout) {
		this._api.timeout == timeout ? timeout : ImageCharts.DEFAULT_TIMEOUT;
	}

	set agent (agent) {
		this._api.agent = agent;
	}

	_prepResources() {
		
		for (let name in resources) {

			Object.defineProperty(this, name, {
				value: ( (args) => new resources[name](this._api, args) ),
				enumerable: true,
				configurable: false,
				writeable: false,
			});

		}

	}

}

module.exports = ImageCharts.instance;

// expose the constructor
module.exports.ImageCharts = ImageCharts;
