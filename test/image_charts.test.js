const {ImageCharts} = require('../lib/image_charts');
const imageCharts = require('../lib/image_charts')();
const Resource = require('../lib/resource');
const ImageChartsError = require('../lib/image_charts_error');
const assert = require('assert');

const {openImg} = require('./_utils');

const ARGS = {
	size: [700,700],
	data:[[60, 40], [10, 30, 5, 8, 2, 40, 5], [20, 20, 20, 20, 20]],
	title: 'Chart Title',
	titleColorSize: ['FF0000', 18],
	seriesColors: [
		['656bb1', '3abce5', '#77c043', 'fede78', 'f79d1d', 'e74e4e'],
		['353c87', '1193bb', '4f9642', 'd5b13f', 'cc7928', 'bc2226'],
		['#a2a3c8', '#7bd2f3', '#a8ce78', '#fce8a5', '#fab34e', '#f18082'],
	],
	grid: [true, true, 0, 0],
	markers: [
		['o','ff9900',0,-1,15.0]
	],
	legendLables: [ 'Legend Item 1', 'Legend Item 2'],
	legendPosition: ['t', 'l'],
	legendTextColorSize: ['FF0000', 18],
	labels: [ '60%', '40%' ],
	margins: [10,100,20,],
	axis: ['x','y'],
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
		
		const args = Resource.prototype._parseArgs( Object.assign({}, ARGS) );

		assert.deepStrictEqual( args, 
			{
				chs: '700x700',
				chd: 'a:60,40|10,30,5,8,2,40,5|20,20,20,20,20',
				chtt: 'Chart Title',
				chts: 'FF0000,18',
				chg: 'true,true,0,0',
				chm: 'o,ff9900,0,-1,15',
				chdl: 'Legend Item 1,Legend Item 2',
				chdlp: 't,l',
				chdls: 'FF0000,18',
				chl: '60%|40%',
				chma: '10,100,20',
				chxt: 'x,y',
				chxr: '1,0,100',
				chxl: '0:,Jan,Feb,Mar,Apr',
				chxs: '0,FF00FF,13|1,FF0000',
				chf: 'bg,s,EFEFEF',
				chan: '1200,easeOutBack',
				chco: '656bb1|3abce5|77c043|fede78|f79d1d|e74e4e,353c87|1193bb|4f9642|d5b13f|cc7928|bc2226,a2a3c8|7bd2f3|a8ce78|fce8a5|fab34e|f18082',
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
				data: ARGS.data[0],
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
				data: ARGS.data[0],
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

	it('should not retrive a chart image since arguments are invalid', async function() {

		let uri;
		
		const resource = new Resource(
			{
				protocol: ImageCharts.DEFAULT_PROTOCOL,
				host: ImageCharts.DEFAULT_HOST,
				path: ImageCharts.DEFAULT_PATH,
			}, 
			{
				type: 'p',
			},
		);

		try {
			uri = await resource.buffer();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(uri);
		assert.ok(uri instanceof ImageChartsError);
		assert.equal(uri.status, 400);

	});


	it('should retrive a horizontal bar chart', async function() {
		
		let uri, chart;

		chart = await imageCharts.barHorizontal({
			size: ARGS.size,
			data: ARGS.data[0],
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
			data: ARGS.data[0],
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
			data: ARGS.data[0],
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
			data: ARGS.data[1],
			seriesColors: ARGS.seriesColors[0],
			insideLabel: '100%'
		});
		
		try {
			uri = await chart.dataUri();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(uri);

		// openImg(uri, {
		// 	width: ARGS.size[0]/2
		// });

	});

	it('should retrive a line chart image', async function() {
		
		let uri, chart;

		chart = imageCharts.line({
			size: ARGS.size,
			data:  [ 
				[ 183, 165, 59, 103, 171, 76, 172, 103, 123, 159, 169, 171],
				[ 28, 131, 29, 118, 183, 27, 105, 72, 153, 127, 67, 99],
				[ 21, 180, 156, 29, 113, 77, 42, 134, 172, 17, 121, 75],
			],
			seriesColors: [
				['ff0000'],
				['00ff00'],
				['0000ff'],
			],
			markers: [
				[ 'o', 'ff0000', 0, -1, 25 ],
				[ 'd', '00ff00', 1, -1, 25 ],
				[ 's', '0000ff', 2, -1, 25 ],
			],
			lineStyle: [
				[ 3, 3, 15 ],
				[ 3, 0, 0 ],
				[ 3, 1, 1 ],
			],
			grid: [ 0, 1, 0, 0 ],
			axis: ['x', 'y'],
			axisLabels: [
				'0:',
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			],
			axisRange: [
				2,0,500,10,
			],
			axisLabelColorSize: [
				[ 0, '383f50', 20 ],
				[ 1, '0000FF', 20 ],
			],

		});

		try {
			uri = await chart.dataUri();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(uri);

		// return openImg(uri, {
		// 	width: ARGS.size[0]/2
		// });

	});

	it('should retrive a pie chart image', async function() {
		
		let uri, chart;

		chart = imageCharts.pie({
			size: ARGS.size,
			data: ARGS.data[0],
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
			data: [ 183, 165, 59, 103, 171, 76],
			labels: ['Apple', 'Peach', 'Banana', 'Orange', 'Pineapple', 'Kiwi'],
			// add some opacity so labels can be seen
			seriesColors: ARGS.seriesColors[0].map( (color) => color+'66'),
			axis: ['x'],
		});

		try {
			uri = await chart.dataUri();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(uri);
		
		// return openImg(uri, {
		// 	width: ARGS.size[0]/2
		// });

	});

});
