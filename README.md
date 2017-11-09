# Clinical Timelines

<p align="center"> 
<img src="![alt tag](https://user-images.githubusercontent.com/31038805/32514368-ccf98744-c3ca-11e7-890d-d10bba8350ff.gif)">
</p>



## Overview

Clinical Timelines is a JavaScript library that provides line charts with an overview of events over time. It is designed for use in clinical trial research, but can also be applied in other areas.   

Clinical Timelines includes helpful visualization features such as points for all events occurring within a single day or points for a single event witnessed over multiple days. Users can also access a separate page view of individual participant data.

[Click here to see a live demo](https://rhoinc.github.io/viz-library/examples/0022-clinical-timelines/example.html) when the page loads the user sees multiple colored lines providing a summary of events happening overtime within a clinical study. 

![alt tag](https://user-images.githubusercontent.com/31038805/32617032-e90cc4aa-c541-11e7-8ec8-c8867de51c94.PNG)


## Usage

Download the [latest release](https://github.com/RhoInc/clinical-timelines/releases/latest). The released bundle supports anonymous AMD, CommonJS, and vanilla environments. You can load directly from [rawgit](https://rawgit.com/RhoInc/clinical-timelines/master/build/clinicalTimelines.js). For example:

```html
<script type = 'text/javascript' src = 'https://d3js.org/d3.v3.js'></script>
<script type = 'text/javascript' src = 'https://rawgit.com/RhoInc/clinical-timelines/master/build/Webcharts.js'></script>
<script type = 'text/javascript' src = 'https://rawgit.com/RhoInc/clinical-timelines/master/build/clinicalTimelines.js'></script>
```

Clinical Timelines is written using [ES2015 modules](http://www.2ality.com/2014/09/es6-modules-final.html). To import Clinical Timelines into an ES2015 application, import its only module (here, `clinicalTimelines`):

```js
import clinicalTimelines from "clinical-timelines";
```

In Node:

```js
var clinicalTimelines = require("clinical-timelines");
```
## Links

More information is available in the project's [wiki](https://github.com/RhoInc/clinical-timelines/wiki): 

* [Data Guidelines](https://github.com/RhoInc/clinical-timelines/wiki/Data-Guidelines)
* [API Reference](https://github.com/RhoInc/clinical-timelines/wiki/API)
* [Release Notes](https://github.com/RhoInc/clinical-timelines/releases)
* [Examples](https://rhoinc.github.io/viz-library/)
