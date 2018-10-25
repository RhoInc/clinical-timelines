# Clinical Timelines
![alt tag](https://user-images.githubusercontent.com/31038805/32514368-ccf98744-c3ca-11e7-890d-d10bba8350ff.gif)

## Overview
Clinical Timelines is a JavaScript library that visualizes events over time via a faceted, interactive timeline chart.
While initially designed for use in clinical trial research, the library works with any longitudinal data of one record per event.

Clinical Timelines presents all timepoints and time intervals for each facet, e.g. for each participant in a clinical trial.
Users can drill down to individual timelines which pulls up a set of small multiples, each representing a single event type, and a detailed listing of that individual's data.

![alt tag](https://user-images.githubusercontent.com/31038805/32617032-e90cc4aa-c541-11e7-8ec8-c8867de51c94.PNG)

[Click here](https://rhoinc.github.io/clinical-timelines/build/test-page/) to see a demo with clinical trial data as the input.

## Usage
With a dataset that meets the [default variable requirements](https://github.com/RhoInc/clinical-timelines/wiki/Data-Guidelines), the renderer can be initialized with the following code:

```javascript
d3.csv(
    'https://raw.githubusercontent.com/RhoInc/viz-library/master/data/safetyData/ADTIMELINES.csv',
    function(data) {
        clinicalTimelines('body', settings).init(data);
    }
);
```

Download the [latest release](https://github.com/RhoInc/clinical-timelines/releases/latest), which supports anonymous AMD, CommonJS, and vanilla environments.
You can also load the library directly from [jsDelivr](https://cdn.jsdelivr.net/npm/clinical-timelines/build/clinicalTimelines.js):
Import into a webpage like so:

```html
<script type = 'text/javascript' src = 'https://d3js.org/d3.v3.js'></script>
<script type = 'text/javascript' src = 'https://cdn.jsdelivr.net/npm/webcharts/build/webcharts.js'></script>
<script type = 'text/javascript' src = 'https://cdn.jsdelivr.net/npm/clinical-timelines/build/clinicalTimelines.js'></script>
```

Clinical Timelines is a modular library written with [ECMAScript 2015 syntax (ES2015)](http://es6-features.org/).
To import Clinical Timelines into an ES2015 application, import its only module (here, `clinicalTimelines`):

```js
import clinicalTimelines from "clinical-timelines";
```

And in Node:

```js
var clinicalTimelines = require("clinical-timelines");
```
## Links
More information is available in the project's [wiki](https://github.com/RhoInc/clinical-timelines/wiki):

* [Interactive Example](https://rhoinc.github.io/clinical-timelines/test-page/)
* [Data Guidelines](https://github.com/RhoInc/clinical-timelines/wiki/Data-Guidelines)
* [API Reference](https://github.com/RhoInc/clinical-timelines/wiki/API)
* [Release Notes](https://github.com/RhoInc/clinical-timelines/releases)
