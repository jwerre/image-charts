'use strict';

const crypto = require('crypto');
const {URL, URLSearchParams} = require('url');
const axios = require('axios');
const ImageChartsError = require('./image_charts_error');


const QUERY_MAP = {
	size: 'chs',
	type: 'cht',
	data: 'chd',
	dataScaling: 'chds',
	lineStyle: 'chls',
	title: 'chtt',
	titleColorSize: 'chts',
	grid: 'chg',
	markers: 'chm',
	labels: 'chl',
	insideLabel: 'chli',
	seriesColors: 'chco',
	legendLables: 'chdl',
	legendPosition: 'chdlp',
	legendTextColorSize: 'chdls',
	margins: 'chma',
	axes: 'chxt',
	axisRange: 'chxr',
	axisLabels: 'chxl',
	axisLabelColorSize: 'chxs',
	background: 'chf',
	animation: 'chan',
	format: 'chof',

};

const DATA_FORMATS = [
	'a',
	'e',
	's',
	't',
];

class Resource {
	

	constructor(api, options={}) {
		
		// console.log( require('util').inspect(api, {depth:10, colors:true}) );
		// console.log( require('util').inspect(options, {depth:10, colors:true}) );
		
		this.account = api.account;
		this.secret = api.secret;
		this.version = api.version;
		this.protocol = api.protocol;
		this.host = api.host;
		this.port = api.port;
		this.path = api.path;
		this.timeout = api.timeout;
		this.agent = api.agent;
		this.env = api.env;
		
		// make sure stacked option deleted
		delete options.stacked;
		
		this.query = this._parseArgs( options );

	}
	
	static get QUERY_MAP () { return QUERY_MAP; }

	static get DATA_FORMATS () { return DATA_FORMATS; }
	
	get mimetype () {
		// I believe mimetype is always png unless it's and animated gif
		return ( this.query[Resource.QUERY_MAP.animated] ) ? 'image/gif' : 'image/png';
	}
	
	buffer () {
		return this._getChart()
			.then( function (response) {

				if (!response.data) {
					return ImageChartsError.generate(404);
				}
				
				return response.data;

			})
			.catch(function(err){
				return ImageChartsError.generate(err.response.status || 500, err);
			});

	}

	dataUri (encoding='base64') {

		let uri = `data:${this.mimetype};${encoding},`;
		
		return this._getChart()
			.then( function (response) {

				if (!response.data) {
					return ImageChartsError.generate(404);
				}
				
				uri += Buffer.from(response.data, 'binary').toString(encoding);
				
				return uri;
			})
			.catch(function(err){
				return ImageChartsError.generate(err.response.status || 500, err);
			});
	}

	_getChart (type='arraybuffer') {
		
		let url = this._generateRquestUrl();
		
		return axios.get( url,
			{
				method: 'GET',
				responseType: type,
				timeout: this.timeout,
				headers: {
					'User-Agent': this.agent
				},
			}
		);

	}
	

	_signQuery(secretKey, query) {
		return crypto
			.createHmac('sha256', secretKey)
			.update(query)
			.digest('hex');
	}

	_parseArgs (args) {
		
		if (!args.dataFormat) {
			args.dataFormat = Resource.DATA_FORMATS[0];
		}


		// make sure chart data has correct format
		if (args.data && args.data.length) {
			
			if (Array.isArray(args.data[0])) {
				if ( Number.isFinite(args.data[0][0]) ) {
					args.data[0][0] = `${args.dataFormat}:${args.data[0][0]}`;
				}
			} else {
				if ( Number.isFinite(args.data[0]) ) {
					args.data[0] = `${args.dataFormat}:${args.data[0]}`;
				}
			}
			
		}
		
		// replace hashes on hex values
		if (args.seriesColors && args.seriesColors.length) {
			
			try {
				args.seriesColors = JSON.parse( JSON.stringify(args.seriesColors).replace(/#/g, '') );
			} catch (err) { }
			
		}

		delete args.dataFormat;
		
		if (args.size && Array.isArray(args.size)) {
			args.size = args.size.join('x');
		}

		let remapped = {};

		for (let [key, value] of Object.entries(args)) {
			
			// because series color delimiters are reversed
			let del =  (key === 'seriesColors') ? '|' : ',';
			
			if (Array.isArray(value) && value.length) {
				
				// flattten multidimensional arrays
				if (Array.isArray(value[0])) {

					del = (key === 'seriesColors') ? ',' : '|';
					
					value = value.map( function (val, i) {
						return val.join( (key === 'seriesColors') ? '|' : ',' );
					});
				}

				
				value = value.join(del);
			}
			
			if (Resource.QUERY_MAP.hasOwnProperty(key)) {
				remapped[Resource.QUERY_MAP[key]] = value;
			} else {
				// pass along values that aren't in the query map.
				remapped[key] = value;
			}
		}
		
		return remapped;

	}

	_generateRquestUrl () {
		
		let url = new URL(`${this.protocol}://${this.host}`),
			searchParams,
			signature;
		
		if (this.path) {
			url.pathname = this.path;
		}

		if (this.port) {
			url.port = this.port;
		}
		
		if (this.account && this.account.length) {
			this.query.icac = this.account;
		}
		
		searchParams = new URLSearchParams(this.query);
		
		if (this.query.icac && this.secret && this.secret.length) {
		
			let rawQuerystring = url.search.toString();
		
			signature = crypto
				.createHmac('sha256', this.secret)
				.update(rawQuerystring)
				.digest('hex');
		
			searchParams.append('ichm', signature);

		}
		
		
		url.search = searchParams.toString();
		
		
		return url.toString();

	}

	
}

module.exports = Resource;
