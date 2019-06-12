const {ImageCharts} = require('../lib/image_charts');
const imageCharts = require('../lib/image_charts')();
const Resource = require('../lib/resource');
const assert = require('assert');

const {openImg} = require('./_utils');

const ARGS = {
	size: [700,700],
	data:[60, 40],
	title: 'Chart Title',
	titleColorSize: ['FF0000', 18],
	grid: [true, true, 0, 0],
	markers: [
		['o','ff9900',0,-1,15.0]
	],
	legendLables: [ 'Legend Item 1', 'Legend Item 2'],
	legendPosition: ['t', 'l'],
	legendTextColorSize: ['FF0000', 18],
	labels: [ '60%', '40%' ],
	margins: [10,100,20,],
	axes: ['x','y'],
	axisRange: [1,0,100],
	axisLabels: [
		['0:', 'Jan', 'Feb', 'Mar', 'Apr'],
	],
	axisLabelColorSize: [
		[0,'FF00FF',13],
		[1,'FF0000'],
	],
	background: ['bg','s','EFEFEF'],
	animation: ['1200','easeOutBack'],
	format: '.png',
};

describe('Chart Image', function() {
	
	it('should parse query arguments', async function() {
		
		const args = Resource.prototype._parseArgs(ARGS);

		assert.deepStrictEqual( args, 
			{
				chs: '700x700',
				chd: 'a:60,40',
				chtt: 'Chart Title',
				chts: 'FF0000,18',
				chg: 'true,true,0,0',
				chm: 'o,ff9900,0,-1,15',
				chdl: 'Legend Item 1,Legend Item 2',
				chdlp: 't,l',
				chdls: 'FF0000,18',
				chl: '60%,40%',
				chma: '10,100,20',
				chxt: 'x,y',
				chxr: '1,0,100',
				chxl: '0:,Jan,Feb,Mar,Apr',
				chxs: '0,FF00FF,13|1,FF0000',
				chf: 'bg,s,EFEFEF',
				chan: '1200,easeOutBack',
				chof: '.png'
			}
		);

	});

	it('should parse native query arguments', async function() {
		
		const args = Resource.prototype._parseArgs({
			chs: '700x100',
			chd: 't:60,40',
			chtt: 'Chart Title',
		});
		
		assert.deepStrictEqual( args, {
			chs: '700x100',
			chd: 't:60,40',
			chtt: 'Chart Title',
		});

	});

	it('should generate authenticated chart url', async function() {
		
		const resource = new Resource(
			{
				account: '1234567890',
				secret: '!!super$ecret!!',
				protocol: ImageCharts.DEFAULT_PROTOCOL,
				host: ImageCharts.DEFAULT_HOST,
				path: ImageCharts.DEFAULT_PATH,
			},
			{
				type: 'p',
				size: ARGS.size,
				data: ARGS.data,
			}
		);

		const url = resource._generateRquestUrl();
		assert.ok( /^https:\/\/image-charts.com\/chart\?cht=p&chs=700x700&chd=a%3A60%2C40&icac=1234567890&ichm=.+/.test(url) );

	});


	it('should retrive a chart image as buffer', async function() {

		let buffer;
		
		const resource = new Resource(
			{
				protocol: ImageCharts.DEFAULT_PROTOCOL,
				host: ImageCharts.DEFAULT_HOST,
				path: ImageCharts.DEFAULT_PATH,
			}, 
			{
				type: 'p',
				size: ARGS.size,
				data: ARGS.data,
			},
		);

		try {
			buffer = await resource.buffer();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(buffer instanceof Buffer);
		
	});

	it('should retrive a chart image as data uri', async function() {

		let uri;
		
		const resource = new Resource(
			{
				protocol: ImageCharts.DEFAULT_PROTOCOL,
				host: ImageCharts.DEFAULT_HOST,
				path: ImageCharts.DEFAULT_PATH,
			}, 
			{
				type: 'p',
				size: ARGS.size,
				data: [40,60],
			},
		);

		try {
			uri = await resource.dataUri();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(uri);
		// return openImg(uri);

	});


	it('should retrive a horizontal bar chart', async function() {
		
		let uri, chart;

		chart = await imageCharts.barHorizontal({
			size: ARGS.size,
			data: ARGS.data,
		});

		try {
			uri = await chart.dataUri();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(uri);

	});

	it('should retrive a bar chart', async function() {
		
		let uri, chart;

		chart = imageCharts.bar({
			size: ARGS.size,
			data: ARGS.data,
		});

		try {
			uri = await chart.dataUri();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(uri);

	});

	it('should retrive a bubble chart', async function() {
		
		let uri, chart;

		chart = imageCharts.bubble({
			size: ARGS.size,
			data: ARGS.data,
		});

		try {
			uri = await chart.dataUri();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(uri);

	});

	it('should retrive a doughnut chart image', async function() {
		
		let uri, chart;

		chart = imageCharts.doughnut({
			size: ARGS.size,
			data: ARGS.data,
		});

		try {
			uri = await chart.dataUri();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(uri);

	});

	it('should retrive a line chart image', async function() {
		
		let uri, chart;

		chart = imageCharts.line({
			size: ARGS.size,
			data: ARGS.data,
		});

		try {
			uri = await chart.dataUri();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(uri);

	});

	it('should retrive a pie chart image', async function() {
		
		let uri, chart;

		chart = imageCharts.pie({
			size: ARGS.size,
			data: ARGS.data,
		});

		try {
			uri = await chart.dataUri();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(uri);

	});

	it('should retrive a polar chart image', async function() {
		
		let uri, chart;

		chart = imageCharts.polar({
			size: ARGS.size,
			data: ARGS.data,
		});

		try {
			uri = await chart.dataUri();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(uri);

	});

});
