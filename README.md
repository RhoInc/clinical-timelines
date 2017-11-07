# Clinical Timelines

Cinical Timelines is a JavaScript library for visualizing clinical events over time by participant.



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
