# Image Charts Node.js Library

The ImageCharts Node library provides convenient access to the [ImageCharts API](https://documentation.image-charts.com) from applications written in server-side JavaScript.

*NOTE: This has not been tested on Windows or the browser*

## Installation

Install the package with:
```bash
npm install image-charts --save
```

## Usage

``` js
const imageCharts = require('image-charts')({
	account: '<account_id>',
	secret: '<secret_key>',
});

(async function(){

	const args: {
		size: [
			700,
			100
		],
		data:[
			60,
			40,
		]
		label: 'Hello World'
		labels: [
			'60%',
			'40%',
		]
	};

	const pieChart = await imageCharts.pie(args);

	try {
		pieChart.buffer(); // <Buffer 64 66 67 68 6a...
	} catch (err) {
		return Promise.reject(err);
	}

	try {
		pieChart.dataUri(); // data:image/png;base64,...
	} catch (err) {
		return Promise.reject(err);
	}

})();

```

### Configuration

Request timeout is configurable (the default is Node's default of 120 seconds):

#### Timeout

Set the timeout for requestions. Default: Node.js default (`require('http').createServer().timeout; => 120000`)

``` js
imageCharts.timeout(20000); // in ms (this is 20 seconds)
```
#### Host

Set the api host. Default is 'image-charts.com'

```js
imageCharts.host('<host>')
```
#### Protocol

Set the api protocol. Default: 'https'

```js
imageCharts.protocol('<protocol>')
```
#### Port

Set the api port.

```js
imageCharts.port('<port>')
```
#### Path

Set the api path. Default: 'chart'

```js
imageCharts.path('<path>')
```
#### ApiVersion

Set the api api version. I don't think this api uses versioning but it should. This is here just in case.

```js
imageCharts.version('<api-version>')
```
#### Secret

Set the api secret for Enterprise accounts.

```js
imageCharts.secret('<secret>')
```
#### Account Id

Set the api account id for Enterprise accounts.

```js
imageCharts.account('<account>')
```

#### Agent

Set the api user agent.

```js
imageCharts.agent('<agent>')
```

### Chart Methods

#### Bar

```js
const chart = imageCharts.bar({
	size:[700,700],
	data:[40,60]
});
```
#### Bar Horizontal

```js
const chart = imageCharts.barHorizontal({
	size:[700,700],
	data:[40,60]
});
```
#### Bubble

```js
const chart = imageCharts.bubble({
	size:[700,700],
	data:[40,60]
});
```
#### Doughnut

```js
const chart = imageCharts.doughnut({
	size:[700,700],
	data:[40,60]
});
```
#### Line

```js
const chart = imageCharts.line({
	size:[700,700],
	data:[40,60]
});
```
#### Pie

```js
const chart = imageCharts.pie({
	size:[700,700],
	data:[40,60]
});
```
#### Polar

```js
const chart = imageCharts.polar({
	size:[700,700],
	data:[40,60]
});
```

### Getting the chart

Once the chart is instantiated retrieve the image with either `buffer` or `dataUri`. Both return a Promise.


```js
const chart = imageCharts.bar({
	size:[700,700],
	data:[40,60]
});

chart.buffer()
	.then(function(img){
		// <Buffer 64 66 67 68 6a...
	})

// or
chart.dataUri()
	.then(function(img){
		// data:image/png;base64,...
	})

```




### Chart Method Options

| Property | Docs | Type | Example | Description |
| --- | --- | --- | --- | --- |
| size | [chs](https://documentation.image-charts.com/reference/chart-size/) | Array | `[800, 500]` | Total width and height of the chart. |
| data | [chd](https://documentation.image-charts.com/reference/data-format/) | Array[] | [ `[1,19,27,53,61,-1],[12,39,57,45,51,27] ]` | Datasets for chart. |
| dataFormat | [chds](https://documentation.image-charts.com/reference/data-format) | String | `'t'` | Dataset format for chart. Default: 'a' |
| dataScaling | [chds](https://documentation.image-charts.com/reference/data-format/#text-format-with-custom-scaling) | Array[] | [ `[80,140]` ] | Datasets for chart. |
| stacked | [bvs\|bhg](https://documentation.image-charts.com/bar-charts) | Boolean | `true` | Stacked view for bar and horizontal bar charts. |
| title | [chtt](https://documentation.image-charts.com/reference/chart-title/) | String | `'Site+visitors+by+month'` | Text for chart title. |
| titleColorSize | [chts](https://documentation.image-charts.com/reference/chart-title/) | Array | `['FF0000',20,'r']` | Color and font size for chart title. |
| grid | [chg](https://documentation.image-charts.com/reference/grid-lines/) | Array | `[0,50,1,5]` | Solid or dotted grid lines for chart. |
| markers | [chm](https://documentation.image-charts.com/reference/shape-markers/) | Array[] | `[['s','E4061C',0,-1,15.0],['B','FCECF4',0,0,0]]` | Graphical markers for all data points on chart. |
| labels | [chl](https://documentation.image-charts.com/reference/shape-markers/) | Array | `['20°','20°','30°','40°','50°']` | Labels for chart slices, lines or bars. |
| insideLabel | [chli](https://documentation.image-charts.com/pie-charts/#inside-label) | String | `'100%'` | Label for the inside of a doughnut chart. |
| seriesColors | [chco](https://documentation.image-charts.com/pie-charts/#series-colors) | Array | `['EA469E','03A9F4']` | Series colors for chart. |
| legendLabels | [chdl](https://documentation.image-charts.com/reference/legend-text-and-style/) | Array | `['NASDAQ', 'FTSE100', 'DOW']` | Labels for chart legend |
| legendPosition | [chdlp](https://documentation.image-charts.com/reference/legend-text-and-style/) | Array or String | `['r', 'r']` | Label position and/or order of chart legend. |
| legendTextColorSize | [chdls](https://documentation.image-charts.com/reference/legend-text-and-style/) | Array | `['9e9e9e',17]` | Font color and size for chart legend labels. |
| margins | [chma](https://documentation.image-charts.com/reference/chart-margin/) | Array | `[10,100,20,10]` | Margins for chart. |
| axes | [chxt](https://documentation.image-charts.com/reference/chart-axis/) | Array | `['x','y']` | Display Values on chart axis. |
| axisRange | [chxr](https://documentation.image-charts.com/reference/chart-axis/) | Array | `[1,-50,50]` |  Range of values that appear on chart axis. |
| axisLabels | [chxl](https://documentation.image-charts.com/reference/chart-axis/) | Array | `['0:','Jan','Feb','March','April','May']` |  Custom axis labels. |
| axisLabelColorSize | [chxs](https://documentation.image-charts.com/reference/chart-axis/) | Array | `[[0,'FF00FF',13],[1,'FF0000']]` |  Font size and color for axis labels |
| background | [chf](https://documentation.image-charts.com/reference/background-fill/) | Array | `['bg','s','EFEFEF']` |  Background color for chart |
| animation | [chan](https://documentation.image-charts.com/reference/animation/) | Array | `[1200,'easeOutBack']` |  Animated gif properties |
| format | [chof](https://documentation.image-charts.com/reference/output-format/) | String | `'.png'` |  Image format for chart |


## Authentication

Authenticate your account when using the API by including your account id and secret key. Be sure to keep it secret! To use your API secret choose one of the methods below. The library will then automatically send your secret with each request. There are multiple ways to pass your account id and secret to the module.

### Module Level Authentication

You can pass your account id and api secret, as well as a number of other arguments, directly to the ImageCharts module.

```js	
const imageCharts = require('image-charts')({
	account: '<account_id>',
	secret: '<secret_key>',
	version: '<version>',
	host: '<host>',
	port: '<port>',
	path: '<path>',
	protocol: '<protocol>',
	timeout: '<timeout>',
});
```
	
ES6 style:

```js	
import {ImageCharts} from 'image-charts';
const imageCharts = new ImageCharts({
	account: '<account_id>',
	secret: '<secret_key>',
	version: '<version>',
	host: '<host>',
	port: '<port>',
	path: '<path>',
	protocol: '<protocol>',
	timeout: '<timeout>',

});
```

### Config File Authentication

If you don't pass your API secret directly to the module it will automatically look for it in an `.image_charts.json` file in your home directory. Be sure that the file is valid JSON and has the value `account` and `secret`.

```bash
'{"account": "<your account id>", "secret": "<your api secret>"}' > ~/.image_charts.json
```

If you'd like to store your API secret in a location other than your home folder, create the environmental variable `IMAGE_CHARTS_AUTH` that points to a valid json file.

```bash
export IMAGE_CHARTS_AUTH=/path/to/my/my_image_charts_auth.json
```

Config file authentication is overwritten by authentication passed directly to the module.

### Environmental Variable Authentication

You can also save both your account id and api secret as an environmental variable.

```bash
export IMAGE_CHARTS_ID="<your account id>"
export IMAGE_CHARTS_SECRET="<your api secret>"
```

Environmental authentication is overwritten by config file authentication.

## Testing

To run test execute the following commands.

```bash
npm install
npm test
```
