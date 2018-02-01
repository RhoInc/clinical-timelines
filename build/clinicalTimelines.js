(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('d3'), require('webcharts')))
        : typeof define === 'function' && define.amd
          ? define(['d3', 'webcharts'], factory)
          : (global.clinicalTimelines = factory(global.d3, global.webCharts));
})(this, function(d3, webcharts) {
    'use strict';

    Number.isInteger =
        Number.isInteger ||
        function(value) {
            return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
        };

    /*------------------------------------------------------------------------------------------------\
  Add assign method to Object if nonexistent.
\------------------------------------------------------------------------------------------------*/

    if (typeof Object.assign != 'function') {
        (function() {
            Object.assign = function(target) {
                'use strict';

                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
                return output;
            };
        })();
    }

    function defineStyles() {
        var styles = [
                /***--------------------------------------------------------------------------------------\
      Global styles
    \--------------------------------------------------------------------------------------***/

                '#clinical-timelines {' + '    display: inline-block;' + '    width: 100%;' + '}',
                '#clinical-timelines .hidden {' + '    display: none !important;' + '}',
                '#clinical-timelines .ct-button {' +
                    '    cursor: pointer !important;' +
                    '    border-radius: 4px !important;' +
                    '    padding: 5px !important;' +
                    '}',
                '#clinical-timelines .ct-button.highlighted {' +
                    '    border: 2px solid black !important;' +
                    '}',
                '#clinical-timelines .ct-button.selected {' + '    background: lightgray;' + '}',

                /***--------------------------------------------------------------------------------------\
      Left and right side containers
    \--------------------------------------------------------------------------------------***/

                '#clinical-timelines > * {' + '    display: inline-block;' + '}',
                '#clinical-timelines > #left-side {' + '    width: 22%;' + '    float: left;' + '}',
                '#clinical-timelines > #right-side {' +
                    '    width: 75%;' +
                    '    float: right;' +
                    '}',
                '#clinical-timelines > * > * {' +
                    '    width: 100%;' +
                    '    vertical-align: top;' +
                    '    display: inline-block;' +
                    '    margin-bottom: 10px;' +
                    '}',

                /***--------------------------------------------------------------------------------------\
      Left side container elements
    \--------------------------------------------------------------------------------------***/

                '#clinical-timelines > #left-side > * {' +
                    '    border: 1px solid #eee;' +
                    '    padding: 10px;' +
                    '}',

                //Annotations
                '#clinical-timelines > #left-side > .annotation {' +
                    '    font-size: 90%;' +
                    '    text-align: right;' +
                    '}',
                '#clinical-timelines > #left-side > .annotation .ct-stats,' +
                    '#clinical-timelines > #left-side > .annotation #ID,' +
                    '#clinical-timelines > #left-side > .annotation .characteristic span {' +
                    '    font-weight: bold;' +
                    '}',
                '#clinical-timelines > #left-side > .annotation .ct-stats.sample {' +
                    '    color: green;' +
                    '}',
                '#clinical-timelines > #left-side > .annotation .ct-stats.sample-inside-time-range {' +
                    '    color: blue;' +
                    '}',
                '#clinical-timelines > #left-side > .annotation .ct-stats.sample-outside-time-range {' +
                    '    color: red;' +
                    '}',
                '#clinical-timelines > #left-side > .annotation .ct-info-icon {' +
                    '    font-weight: bold;' +
                    '    color: blue;' +
                    '    cursor: help;' +
                    '}',

                //Controls
                '#clinical-timelines > #left-side > .wc-controls {' + '    clear: left;' + '}',
                '#clinical-timelines > #left-side > .wc-controls .control-group {' +
                    '    margin: 0 0 5px 0;' +
                    '    display: block;' +
                    '    float: right;' +
                    '    clear: both;' +
                    '    width: 100%;' +
                    '}',
                '#clinical-timelines > #left-side > .wc-controls .horizontal-rule {' +
                    '    width: 100%;' +
                    '    display: inline-block;' +
                    '    margin-bottom: 5px;' +
                    '    font-size: 150%;' +
                    '    border-bottom: 1px solid black;' +
                    '}',
                '#clinical-timelines > #left-side > .wc-controls .control-group.ID {' +
                    '    display: inline-block;' +
                    '}',
                '#clinical-timelines > #left-side > .wc-controls .control-group > * {' +
                    '    display: inline-block;' +
                    '    vertical-align: top;' +
                    '    float: right;' +
                    '}',
                '#clinical-timelines > #left-side > .wc-controls .control-group .span-description {' +
                    '    font-size: 90%;' +
                    '}',
                '#clinical-timelines > #left-side > .wc-controls .control-group .changer {' +
                    '    margin-left: 5px;' +
                    '    width: 50%;' +
                    '    clear: right;' +
                    '    box-sizing: border-box;' +
                    '}',
                '#clinical-timelines > #left-side > .ID-details .back-button {' +
                    '    display: inline-block;' +
                    '    float: left;' +
                    '}',
                '#clinical-timelines > #left-side > .ID-details .back-button button {' +
                    '    padding: 0 5px;' +
                    '    font-size: 110%;' +
                    '}',

                //Reference Tables
                '#clinical-timelines > #left-side .poe-reference-line-header {' +
                    '    text-align: center;' +
                    '    border-bottom: 1px solid black;' +
                    '    padding-bottom: 5px;' +
                    '}',
                '#clinical-timelines > #left-side .poe-reference-line-table {' +
                    '    width: 100%;' +
                    '    display: table;' +
                    '}',
                '#clinical-timelines > #left-side .poe-reference-line-table th,' +
                    '#clinical-timelines > #left-side .poe-reference-line-table td {' +
                    '    text-align: left;' +
                    '}',
                '#clinical-timelines > #left-side .poe-higher-level {' +
                    '    border-bottom: 1px dotted lightgray;' +
                    '    font-weight: bold;' +
                    '    font-size: 14px;' +
                    '}',
                '#clinical-timelines > #left-side .poe-lower-level {' +
                    '    font-size: 12px;' +
                    '}',
                '#clinical-timelines > #left-side .poe-lower-level.poe-indent {' +
                    '    padding-left: 5%;' +
                    '}',

                /***--------------------------------------------------------------------------------------\
      Right side container elements
    \--------------------------------------------------------------------------------------***/

                '#clinical-timelines > #right-side > * {' + '}',

                //Legend
                '#clinical-timelines > #right-side > .wc-chart .legend {' +
                    '    display: flex !important;' +
                    '    justify-content: center;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .legend .legend-title {' +
                    '    border-radius: 4px;' +
                    '    padding: 5px 7px 3px 4px;' +
                    '    border: 2px solid white;' +
                    '    margin-right: .25em !important;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .legend .legend-item {' +
                    '    cursor: pointer;' +
                    '    float: left;' +
                    '    border-radius: 4px;' +
                    '    padding: 4px 7px 3px 4px;' +
                    '    border: 2px solid white;' +
                    '    margin-right: .25em !important;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .legend .legend-item .legend-color-block circle {' +
                    '    cx: .55em !important;' +
                    '    cy: .55em !important;' +
                    '    r: .4em !important;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .legend .legend-item:hover {' +
                    '    border: 2px solid black;' +
                    '}',

                //Y-axis
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .y.axis .tick {' +
                    '    cursor: pointer;' +
                    '    fill: blue;' +
                    '    text-decoration: none;' +
                    '    font-weight: bolder;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .y.axis .tick:hover {' +
                    '    text-decoration: underline;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .y.axis .tick rect.ct-stripe {' +
                    '    stroke: #aaa;' +
                    '    stroke-width: 1;' +
                    '    fill: none;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .y.axis .tick:nth-child(even) rect.ct-stripe {' +
                    '    fill: #eee;' +
                    '}',

                //Grouping
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .grouping .boundary {' +
                    '    stroke: black;' +
                    '    stroke-width: 2;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .grouping .annotation {' +
                    '    font-size: 150%;' +
                    '    font-weight: normal;' +
                    '    text-anchor: start;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .grouping.vertical .annotation {' +
                    '    writing-mode: tb-rl;' +
                    '}',

                //Lines
                '#clinical-timelines path.wc-data-mark {' +
                    '    stroke-width: 4;' +
                    '    stroke-opacity: 1;' +
                    '}',
                '#clinical-timelines path.wc-data-mark.highlighted {' +
                    '    stroke-width: 7;' +
                    '}',
                '#clinical-timelines line.highlight-overlay {' +
                    '    stroke-width: 2;' +
                    '    stroke-linecap: round;' +
                    '}',

                //Circles
                '#clinical-timelines circle.wc-data-mark {' +
                    '    stroke-width: 0;' +
                    '    fill-opacity: 1;' +
                    '}',
                '#clinical-timelines circle.wc-data-mark.highlighted {' +
                    '    stroke-opacity: 1;' +
                    '    stroke-width: 2;' +
                    '}',

                //Arrows
                '#clinical-timelines polygon.ongoing-event {' + '}',
                '#clinical-timelines polygon.ongoing-event.highlighted {' +
                    '    stroke-width: 2;' +
                    '}',

                //Reference lines
                '#clinical-timelines .wc-chart .wc-svg title {' + '    white-space: pre;' + '}',
                '#clinical-timelines > #right-side .wc-chart .wc-svg .visible-reference-line {' +
                    '    stroke: black;' +
                    '    stroke-width: 2;' +
                    '    stroke-dasharray: 2,2;' +
                    '}',
                '#clinical-timelines > #right-side .wc-chart .wc-svg .visible-reference-line.hover {' +
                    '    stroke-dasharray: none;' +
                    '}',
                '#clinical-timelines > #right-side .wc-chart .wc-svg .invisible-reference-line {' +
                    '    stroke: black;' +
                    '    stroke-width: 20;' +
                    '    stroke-opacity: 0;' +
                    '}',
                '#clinical-timelines > #right-side .wc-chart .wc-svg .reference-line-label-box {' +
                    '    fill: white;' +
                    '    stroke: black;' +
                    '    stroke-width: black;' +
                    '}',

                //ID timeline
                '#clinical-timelines > #right-side > .wc-small-multiples .wc-chart {' +
                    '    width: 100%;' +
                    '    padding: 0;' +
                    '    border-top: 1px solid black;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-small-multiples .wc-chart > * {' +
                    '    display: inline-block;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-small-multiples .wc-chart .wc-svg {' +
                    '    float: left;' +
                    '    width: 75%;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-small-multiples .wc-chart .wc-chart-title {' +
                    '    float: right;' +
                    '    text-align: left;' +
                    '    font-size: 150%;' +
                    '    font-weight: normal;' +
                    '    padding-left: 10px;' +
                    '    width: 24%;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-small-multiples .wc-chart .wc-svg .time-range {' +
                    '    opacity: .1;' +
                    '}',

                //Listing
                '#clinical-timelines > #right-side > .wc-chart.wc-table table {' +
                    '    display: table;' +
                    '    width: 100%;' +
                    '}'
            ],
            style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles.join('\n');

        document.getElementsByTagName('head')[0].appendChild(style);
    }

    var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? function(obj) {
                  return typeof obj;
              }
            : function(obj) {
                  return obj &&
                      typeof Symbol === 'function' &&
                      obj.constructor === Symbol &&
                      obj !== Symbol.prototype
                      ? 'symbol'
                      : typeof obj;
              };

    var asyncGenerator = (function() {
        function AwaitValue(value) {
            this.value = value;
        }

        function AsyncGenerator(gen) {
            var front, back;

            function send(key, arg) {
                return new Promise(function(resolve, reject) {
                    var request = {
                        key: key,
                        arg: arg,
                        resolve: resolve,
                        reject: reject,
                        next: null
                    };

                    if (back) {
                        back = back.next = request;
                    } else {
                        front = back = request;
                        resume(key, arg);
                    }
                });
            }

            function resume(key, arg) {
                try {
                    var result = gen[key](arg);
                    var value = result.value;

                    if (value instanceof AwaitValue) {
                        Promise.resolve(value.value).then(
                            function(arg) {
                                resume('next', arg);
                            },
                            function(arg) {
                                resume('throw', arg);
                            }
                        );
                    } else {
                        settle(result.done ? 'return' : 'normal', result.value);
                    }
                } catch (err) {
                    settle('throw', err);
                }
            }

            function settle(type, value) {
                switch (type) {
                    case 'return':
                        front.resolve({
                            value: value,
                            done: true
                        });
                        break;

                    case 'throw':
                        front.reject(value);
                        break;

                    default:
                        front.resolve({
                            value: value,
                            done: false
                        });
                        break;
                }

                front = front.next;

                if (front) {
                    resume(front.key, front.arg);
                } else {
                    back = null;
                }
            }

            this._invoke = send;

            if (typeof gen.return !== 'function') {
                this.return = undefined;
            }
        }

        if (typeof Symbol === 'function' && Symbol.asyncIterator) {
            AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
                return this;
            };
        }

        AsyncGenerator.prototype.next = function(arg) {
            return this._invoke('next', arg);
        };

        AsyncGenerator.prototype.throw = function(arg) {
            return this._invoke('throw', arg);
        };

        AsyncGenerator.prototype.return = function(arg) {
            return this._invoke('return', arg);
        };

        return {
            wrap: function(fn) {
                return function() {
                    return new AsyncGenerator(fn.apply(this, arguments));
                };
            },
            await: function(value) {
                return new AwaitValue(value);
            }
        };
    })();

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        return Object(val);
    }

    function isObj(x) {
        var type = typeof x === 'undefined' ? 'undefined' : _typeof(x);
        return x !== null && (type === 'object' || type === 'function');
    }

    function assignKey(to, from, key) {
        var val = from[key];

        if (val === undefined || val === null) {
            return;
        }

        if (hasOwnProperty.call(to, key)) {
            if (to[key] === undefined || to[key] === null) {
                throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
            }
        }

        if (!hasOwnProperty.call(to, key) || !isObj(val) || val instanceof Array) {
            to[key] = val;
        } else {
            to[key] = assign(Object(to[key]), from[key]);
        }
    }

    function assign(to, from) {
        if (to === from) {
            return to;
        }

        from = Object(from);

        for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
                assignKey(to, from, key);
            }
        }

        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(from);

            for (var i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                    assignKey(to, from, symbols[i]);
                }
            }
        }

        return to;
    }

    function merge$1(target) {
        target = toObject(target);

        for (var s = 1; s < arguments.length; s++) {
            assign(target, arguments[s]);
        }

        return target;
    }

    var rendererSpecificSettings = {
        //ID settings
        id_col: 'USUBJID',
        id_unit: 'participant',
        id_characteristics: null,

        //Event settings
        event_col: 'DOMAIN',
        event_types: null,
        event_highlighted: null,
        event_highlight_color: 'black',

        //Filter settings
        filters: null,

        //Grouping settings
        groupings: null,
        grouping_initial: null,
        grouping_direction: 'horizontal',

        //Timing settings
        time_scale: 'date',

        //Date settings
        stdt_col: 'STDT',
        endt_col: 'ENDT',
        date_range: null,
        date_format: '%Y-%m-%d',
        date_display_format: '%b %y', // sync in syncSettings()

        //Day settings
        stdy_col: 'STDY',
        endy_col: 'ENDY',
        day_range: null,

        //Miscellaneous settings
        seq_col: 'SEQ',
        tooltip_col: 'TOOLTIP',
        ongo_col: 'ONGO',
        ongo_val: 'Y',
        reference_lines: null,

        //Listing settings
        details: null,
        details_config: null
    };

    var webchartsSettings = {
        x: {
            type: null, // set in syncSettings()
            column: 'wc_value',
            label: null, // set in syncSettings()
            format: null // set in syncSettings()
        },
        y: {
            type: 'ordinal',
            column: null, // set in syncSettings()
            label: null, // set in syncSettings()
            sort: 'earliest',
            behavior: 'flex',
            grouping: null // set in syncSettings()
        },
        marks: [
            {
                type: 'line',
                per: null, // set in syncSettings()
                tooltip: null, // set in syncSettings()
                attributes: {
                    'clip-path': 'url(#1)',
                    'stroke-width': 4
                }
            },
            {
                type: 'circle',
                per: null, // set in syncSettings()
                tooltip: null, // set in syncSettings()
                radius: 5,
                attributes: {
                    'clip-path': 'url(#1)',
                    'stroke-width': 2
                }
            }
        ],
        colors: [
            '#1b9e77',
            '#d95f02',
            '#7570b3',
            '#a6cee3',
            '#1f78b4',
            '#b2df8a',
            '#66c2a5',
            '#fc8d62',
            '#8da0cb'
        ],
        color_dom: null, // set in syncSettings()
        legend: {
            location: 'top',
            label: 'Event Type',
            order: null, // set in syncSettings()
            mark: 'circle'
        },
        range_band: 35,
        margin: {
            top: 60,
            right: 40
        }, // for second x-axis
        resizable: false // can't be resizable so the multiples aren't overlapped by their titles
    };

    var settings = Object.assign({}, rendererSpecificSettings, webchartsSettings);

    /*------------------------------------------------------------------------------------------------\
  Clone a variable (http://stackoverflow.com/a/728694).
\------------------------------------------------------------------------------------------------*/

    function clone(obj) {
        var copy;

        //Handle the 3 simple types, and null or undefined
        if (null == obj || 'object' != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)))
            return obj;

        //Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        //Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        //Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    function arrayOfVariablesCheck(defaultVariables, userDefinedVariables) {
        var validSetting =
            userDefinedVariables instanceof Array && userDefinedVariables.length
                ? d3
                      .merge([
                          defaultVariables,
                          userDefinedVariables.filter(function(item) {
                              return (
                                  !(
                                      item instanceof Object &&
                                      item.hasOwnProperty('value_col') === false
                                  ) &&
                                  defaultVariables
                                      .map(function(d) {
                                          return d.value_col;
                                      })
                                      .indexOf(item.value_col || item) === -1
                              );
                          })
                      ])
                      .map(function(item) {
                          var itemObject = {};

                          itemObject.value_col = item instanceof Object ? item.value_col : item;
                          itemObject.label =
                              item instanceof Object
                                  ? item.label || itemObject.value_col
                                  : itemObject.value_col;

                          return itemObject;
                      })
                : defaultVariables;

        return validSetting;
    }

    function syncRendererSpecificSettings(settings) {
        //ID settings
        settings.id_unit = settings.id_unit.replace(/^\s+|\s+$/g, ''); // remove leading and trailing white space
        settings.id_unitPropCased =
            settings.id_unit.substring(0, 1).toUpperCase() +
            settings.id_unit.substring(1).toLowerCase();
        settings.id_unitPlural = /y$/.test(settings.id_unit)
            ? settings.id_unit.substring(0, settings.id_unit.length - 1) + 'ies'
            : settings.id_unit + 's';
        var defaultID_characteristics = [
            { value_col: settings.id_col, label: settings.id_unitPropCased }
        ];
        settings.id_characteristics = arrayOfVariablesCheck(
            defaultID_characteristics,
            settings.id_characteristics
        );

        //Event settings
        if (!(settings.event_types instanceof Array && settings.event_types.length))
            delete settings.event_types;

        //Filter settings
        var defaultFilters = [
            { value_col: settings.id_col, label: settings.id_unitPropCased },
            { value_col: settings.event_col, label: 'Event Type' }
        ];
        if (settings.ongo_col)
            defaultFilters.splice(2, 0, { value_col: settings.ongo_col, label: 'Ongoing?' });
        settings.filters = arrayOfVariablesCheck(defaultFilters, settings.filters);

        //Grouping settings
        var defaultGroupings = [];
        settings.groupings = arrayOfVariablesCheck(defaultGroupings, settings.groupings);
        if (['horizontal', 'vertical'].indexOf(settings.grouping_direction) === -1)
            settings.grouping_direction = 'horizontal';

        //Time settings
        settings.date_display_format = settings.date_display_format || settings.date_format;

        //Reference line settings
        if (settings.reference_lines) {
            if (!(settings.reference_lines instanceof Array))
                settings.reference_lines = [settings.reference_lines];

            settings.reference_lines = settings.reference_lines
                .map(function(reference_line) {
                    var referenceLineObject = {};

                    //either an object or not
                    referenceLineObject.timepoint =
                        reference_line instanceof Object
                            ? reference_line.timepoint
                            : reference_line;

                    //either an integer or not
                    referenceLineObject.time_scale = Number.isInteger(
                        +referenceLineObject.timepoint
                    )
                        ? 'day'
                        : 'date';

                    //label predefined or not
                    referenceLineObject.label = reference_line.label
                        ? reference_line.label
                        : referenceLineObject.time_scale + ': ' + referenceLineObject.timepoint;

                    return referenceLineObject;
                })
                .filter(function(reference_line) {
                    return (
                        (reference_line.time_scale === 'day' &&
                            Number.isInteger(reference_line.timepoint)) ||
                        (reference_line.time_scale === 'date' &&
                            d3.time
                                .format(settings.date_format)
                                .parse(reference_line.timepoint) instanceof Date)
                    );
                });

            if (!settings.reference_lines.length) delete settings.reference_lines;
        }

        //Details
        var defaultDetails = [
            { value_col: settings.event_col, label: 'Event Type' },
            { value_col: 'stdtdy', label: 'Start Date (Day)' },
            { value_col: 'endtdy', label: 'Stop Date (Day)' },
            { value_col: settings.seq_col, label: 'Sequence Number' }
        ];
        settings.details = arrayOfVariablesCheck(defaultDetails, settings.details);
        settings.filters.forEach(function(filter) {
            if (
                settings.details
                    .map(function(detail) {
                        return detail.value_col;
                    })
                    .indexOf(filter.value_col) === -1
            )
                settings.details.push(filter);
        });
    }

    function syncWebchartsSettings(settings) {
        //Y-axis
        settings.y.column = settings.id_col;
        if (settings.grouping_initial) {
            settings.y.grouping = settings.grouping_initial;
            settings.y.groupingLabel =
                settings.groupings[
                    settings.groupings
                        .map(function(grouping) {
                            return grouping.value_col;
                        })
                        .indexOf(settings.grouping_initial)
                ].label;
        }

        //Lines
        settings.marks[0].per = [settings.id_col, settings.event_col, settings.seq_col];

        //Circles
        settings.marks[1].per = [settings.id_col, settings.event_col, settings.seq_col, 'wc_value'];

        //Color stratification
        settings.color_by = settings.event_col;

        //Add space at bottom of timeline to create space for the last ID's offset marks.
        settings.margin.bottom = settings.margin.top + settings.range_band;
    }

    function syncTimeScaleSettings(settings) {
        //Coerce invalid time scale arguments.
        settings.time_scale =
            ['date', 'day'].indexOf(settings.time_scale.toLowerCase()) > -1
                ? settings.time_scale.toLowerCase()
                : 'date';

        //Define settings variables to handle both date and day time scales.
        if (settings.time_scale === 'date') {
            settings.st_col = settings.stdt_col;
            settings.en_col = settings.endt_col;
            settings.x_type = 'time';
            settings.time_unit = 'DT';
            settings.x_format = settings.date_display_format;
            settings.x_parseFormat = d3.time.format(settings.date_format);
            settings.x_displayFormat = d3.time.format(settings.x_format);
            settings.time_function = function(dt) {
                return settings.x_parseFormat.parse(dt)
                    ? settings.x_parseFormat.parse(dt)
                    : new Date(dt);
            };
        } else if (settings.time_scale === 'day') {
            settings.st_col = settings.stdy_col;
            settings.en_col = settings.endy_col;
            settings.x_type = 'linear';
            settings.time_unit = 'DY';
            settings.x_format = '1d';
            settings.x_parseFormat = d3.format(settings.x_format);
            settings.x_displayFormat = settings.x_parseFormat;
            settings.time_function = function(dy) {
                return +dy;
            };
        }

        //Sync x-axis settings with time scale settings.
        settings.x.type = settings.x_type;
        settings.x.label =
            settings.time_scale.substring(0, 1).toUpperCase() + settings.time_scale.substring(1);
        settings.x.format = settings.x_format;

        //Time intervals (lines)
        settings.marks[0].tooltip =
            'Event: [' +
            settings.event_col +
            ']' +
            ('\nStart ' + settings.time_scale + ': [' + settings.st_col + ']') +
            ('\nStop ' + settings.time_scale + ': [' + settings.en_col + ']');
        settings.marks[0].values = { wc_category: [settings.st_col, settings.en_col] };

        //Timepoints (circles)
        settings.marks[1].tooltip =
            'Event: [' +
            settings.event_col +
            ']' +
            ('\n' + settings.x.label + ': [' + settings.st_col + ']');
        settings.marks[1].values = { wc_category: settings.time_unit };
    }

    function syncIDtimelineSettings(settings) {
        settings.x.label = '';
        settings.y.column = settings.seq_col;
        settings.y.sort = 'alphabetical-descending';
        settings.marks[0].per = [settings.event_col, settings.seq_col];
        settings.marks[1].per = [settings.event_col, settings.seq_col, 'wc_value'];
        settings.gridlines = 'y';
        settings.range_band = settings.range_band / 2;
        settings.margin = { left: 25 };
    }

    function syncListingSettings(settings) {
        settings.details_config = settings.details_config || {
            cols: settings.details.map(function(detail) {
                return detail.value_col;
            }),
            headers: settings.details.map(function(detail) {
                return detail.label;
            })
        };

        //Define listing columns and headers if not already defined.
        if (!settings.details_config.hasOwnProperty('cols')) {
            settings.details_config.cols = settings.details.map(function(detail) {
                return detail.value_col;
            });
            settings.details_config.headers = settings.details.map(function(detail) {
                return detail.label;
            });
        }
    }

    function syncSettings(settings) {
        var syncedSettings = clone(settings);

        //Clinical timelines
        syncTimeScaleSettings(syncedSettings);
        syncRendererSpecificSettings(syncedSettings);
        syncWebchartsSettings(syncedSettings);

        //ID timeline
        syncedSettings.IDtimelineSettings = clone(syncedSettings);
        syncIDtimelineSettings(syncedSettings.IDtimelineSettings);

        //Listing
        syncListingSettings(syncedSettings);

        return syncedSettings;
    }

    var controls = [
        {
            type: 'dropdown',
            option: 'event_highlighted',
            label: '',
            description: 'Event highlighting',
            values: null // set in onInit() callback
        },
        {
            type: 'dropdown',
            option: 'time_scale',
            values: ['day', 'date'],
            relabels: ['Day', 'Date'],
            label: '',
            description: 'X-axis scale',
            require: true
        },
        {
            type: 'dropdown',
            option: 'y.sort',
            label: '',
            description: 'Y-axis sort',
            values: ['earliest', 'alphabetical-descending'],
            relabels: ['by earliest event', 'alphanumerically'],
            require: true
        },
        {
            type: 'dropdown',
            option: 'y.grouping',
            label: '',
            description: 'Y-axis grouping'
        }
    ];

    function syncControls(controls, settings) {
        settings.filters
            .sort(function(a, b) {
                return a.value_col === settings.event_col ? 1 : 0;
            })
            .forEach(function(filter) {
                filter.type = 'subsetter';
                filter.description = filter.label;
                filter.label = '';

                if (filter.value_col === settings.id_col) {
                    filter.label = '';
                    filter.description = settings.id_unitPropCased + ' view';
                }

                if (filter.value_col === settings.event_col) {
                    filter.multiple = true;
                    filter.start = settings.event_types;
                }
            });

        var syncedControls = d3.merge([
            [settings.filters[0]], // ID dropdown first
            clone(controls), // Non-filters second
            settings.filters.slice(1) // Filters last
        ]);

        return syncedControls;
    }

    var defaults$1 = {
        settings: settings,
        syncSettings: syncSettings,
        controls: controls,
        syncControls: syncControls
    };

    function manipulateData() {
        var _this = this;

        this.initial_data.forEach(function(d, i) {
            var has_stdt = d.hasOwnProperty(_this.config.stdt_col),
                has_endt = d.hasOwnProperty(_this.config.endt_col),
                has_stdy = d.hasOwnProperty(_this.config.stdy_col),
                has_endy = d.hasOwnProperty(_this.config.endy_col);

            //Set to an empty string invalid date and day values.
            if (has_stdt) {
                if (!d3.time.format(_this.config.date_format).parse(d[_this.config.stdt_col]))
                    d[_this.config.stdt_col] = '';
            }
            if (has_endt) {
                if (!d3.time.format(_this.config.date_format).parse(d[_this.config.endt_col]))
                    d[_this.config.endt_col] = d[_this.config.stdt_col];
            }
            if (has_stdy) {
                if (!/^ *\d+ *$/.test(d[_this.config.stdy_col])) d[_this.config.stdy_col] = '';
            }
            if (has_endy) {
                if (!/^ *\d+ *$/.test(d[_this.config.endy_col]))
                    d[_this.config.endy_col] = d[_this.config.stdy_col];
            }

            //Concatenate date and day values for listing.
            d.stdtdy =
                has_stdt && has_stdy && d[_this.config.stdy_col] !== ''
                    ? d[_this.config.stdt_col] + ' (' + d[_this.config.stdy_col] + ')'
                    : d[_this.config.stdt_col] || d[_this.config.stdy_col];
            d.endtdy =
                has_endt && has_endy && d[_this.config.endy_col] !== ''
                    ? d[_this.config.endt_col] + ' (' + d[_this.config.endy_col] + ')'
                    : d[_this.config.endt_col] || d[_this.config.endy_col];
        });
    }

    function cleanData() {
        var _this = this;

        //Remove records with insufficient data (this.wide_data should only be defined on initialization).
        this.wide_data = this.initial_data.filter(function(d) {
            return d[_this.config.st_col] !== '';
        });

        //Warn user of removed records.
        if (this.wide_data.length < this.initial_data.length) {
            if (this.config.time_scale === 'day')
                console.warn(
                    this.initial_data.length -
                        this.wide_data.length +
                        ' records have been removed due to missing or invalid day variable values.'
                );
            else if (this.config.time_scale === 'date')
                console.warn(
                    this.initial_data.length -
                        this.wide_data.length +
                        ' records have been removed due to missing or invalid date variable values that do not match settings.date_format (' +
                        this.config.date_format +
                        ')'
                );
        }
    }

    /*------------------------------------------------------------------------------------------------\
  Expand a data array to one item per original item per specified column.
\------------------------------------------------------------------------------------------------*/

    function lengthenRaw(data, columns) {
        var my_data = [];

        data.forEach(function(d) {
            columns.forEach(function(column) {
                var obj = Object.assign({}, d);
                obj.wc_category = column;
                obj.wc_value = d[column];
                my_data.push(obj);
            });
        });

        return my_data;
    }

    function defineData() {
        var _this = this;

        //Separate out timepoints and time intervals.
        var timepoints = this.wide_data
                .filter(function(d) {
                    return d[_this.config.st_col] === d[_this.config.en_col];
                })
                .map(function(d) {
                    d.wc_category = _this.config.time_unit;
                    d.wc_value = d[_this.config.st_col];

                    return d;
                }),
            timeIntervals = lengthenRaw(
                this.wide_data.filter(function(d) {
                    return d[_this.config.st_col] !== d[_this.config.en_col];
                }),
                [this.config.st_col, this.config.en_col]
            );

        this.long_data = d3.merge([timepoints, timeIntervals]);
        this.raw_data = this.long_data;
    }

    function setDefaultTimeRanges() {
        var _this = this;

        //Date range
        this.full_date_range = [
            d3.min(this.initial_data, function(d) {
                return d3.time.format(_this.config.date_format).parse(d[_this.config.stdt_col]);
            }),
            d3.max(this.initial_data, function(d) {
                return d3.time.format(_this.config.date_format).parse(d[_this.config.endt_col]);
            })
        ];
        this.date_range =
            this.config.date_range instanceof Array &&
            this.config.date_range.length === 2 &&
            this.config.date_range[0].toString() !== this.config.date_range[1].toString() &&
            this.config.date_range.every(function(date) {
                return date instanceof Date || d3.time.format(_this.config.date_format).parse(date);
            })
                ? this.config.date_range.map(function(date) {
                      return date instanceof Date
                          ? date
                          : d3.time.format(_this.config.date_format).parse(date);
                  })
                : this.full_date_range;

        //Day range
        this.full_day_range = [
            d3.min(this.initial_data, function(d) {
                return +d[_this.config.stdy_col];
            }),
            d3.max(this.initial_data, function(d) {
                return +d[_this.config.endy_col];
            })
        ];
        this.day_range =
            this.config.day_range instanceof Array &&
            this.config.day_range.length === 2 &&
            this.config.day_range[0].toString() !== this.config.day_range[1].toString() &&
            this.config.day_range.every(function(day) {
                return Number.isInteger(+day);
            })
                ? this.config.day_range.map(function(day) {
                      return +day;
                  })
                : this.full_day_range;
    }

    function handleEventTypes() {
        var _this = this;

        this.allEventTypes = d3
            .set(
                this.initial_data.map(function(d) {
                    return d[_this.config.event_col];
                })
            )
            .values()
            .sort();
        this.currentEventTypes = this.config.event_types || this.allEventTypes;
        this.config.color_dom = this.currentEventTypes.concat(
            this.allEventTypes
                .filter(function(eventType) {
                    return _this.currentEventTypes.indexOf(eventType) === -1;
                })
                .sort()
        );
        this.config.legend.order = this.config.color_dom;
    }

    function checkTimeScales() {
        var _this = this;

        this.controls.config.inputs = this.controls.config.inputs.filter(function(input) {
            if (input.description !== 'X-axis scale') return true;
            else {
                var anyDates = _this.initial_data.some(function(d) {
                        return (
                            d.hasOwnProperty(_this.config.stdt_col) &&
                            d[_this.config.stdt_col] !== ''
                        );
                    }),
                    anyDays = _this.initial_data.some(function(d) {
                        return (
                            d.hasOwnProperty(_this.config.stdy_col) &&
                            d[_this.config.stdy_col] !== ''
                        );
                    });

                if (!anyDates && !anyDays) {
                    var errorText =
                        'The data either contain neither ' +
                        _this.config.stdt_col +
                        ' nor ' +
                        _this.config.stdy_col +
                        ' or both ' +
                        _this.config.stdt_col +
                        ' and ' +
                        _this.config.stdy_col +
                        ' contain no valid values.  Please update the settings object to match the variables in the data or clean the data.';
                    _this.wrap
                        .append('div')
                        .style('color', 'red')
                        .html(errorText);
                    throw new Error(errorText);
                } else if (!anyDates && _this.config.time_scale === 'date') {
                    console.warn(
                        'The data either do not contain a variable named ' +
                            _this.config.stdt_col +
                            ' or ' +
                            _this.config.stdt_col +
                            ' contains no valid values.  Please update the settings object to match the variable in the data or clean the data.'
                    );
                    _this.config.time_scale = 'day';
                    syncTimeScaleSettings(_this.config);
                    _this.IDtimeline.config.time_scale = 'day';
                    syncTimeScaleSettings(_this.IDtimeline.config);
                } else if (!anyDays && _this.config.time_scale === 'day') {
                    console.warn(
                        'The data either do not contain a variable named ' +
                            _this.config.stdy_col +
                            ' or ' +
                            _this.config.stdy_col +
                            ' contains no valid values.  Please update the settings object to match the variable in the data or clean the data.'
                    );
                    _this.config.time_scale = 'date';
                    syncTimeScaleSettings(_this.config);
                    _this.IDtimeline.config.time_scale = 'date';
                    syncTimeScaleSettings(_this.IDtimeline.config);
                }

                return anyDates && anyDays;
            }
        });
    }

    function checkOtherControls() {
        var _this = this;

        this.controls.config.inputs
            .filter(function(input) {
                return input.type !== 'subsetter';
            })
            .forEach(function(input) {
                //Set values of Event Type highlighting control to event types present in the data.
                if (input.description === 'Event highlighting')
                    input.values = _this.config.color_dom;
                else if (input.description === 'Y-axis grouping')
                    input.values = _this.config.groupings.map(function(grouping) {
                        return grouping.value_col;
                    });

                return true;
            });

        checkTimeScales.call(this);
    }

    function checkFilters() {
        var _this = this;

        this.controls.config.inputs = this.controls.config.inputs.filter(function(input) {
            if (input.type !== 'subsetter') return true;
            else if (!_this.raw_data[0].hasOwnProperty(input.value_col)) {
                console.warn(
                    input.value_col + ' filter removed because the variable does not exist.'
                );

                return false;
            } else {
                var levels = d3
                    .set(
                        _this.raw_data.map(function(d) {
                            return d[input.value_col];
                        })
                    )
                    .values();

                if (levels.length < 2) {
                    console.warn(
                        input.value_col + ' filter removed because the variable has only one level.'
                    );
                }

                return levels.length > 1;
            }
        });
    }

    function addDataDrivenTooltips() {
        var _this = this;

        if (this.raw_data[0].hasOwnProperty(this.config.tooltip_col)) {
            this.config.marks.forEach(function(mark) {
                mark.tooltip = mark.tooltip + '\n[' + _this.config.tooltip_col + ']';
            });
            this.config.IDtimelineSettings.marks.forEach(function(mark) {
                mark.tooltip = mark.tooltip + '\n[' + _this.config.tooltip_col + ']';
            });
        }
    }

    function onInit() {
        var _this = this;

        this.populationDetails = {
            population: d3
                .set(
                    this.raw_data.map(function(d) {
                        return d[_this.config.id_col];
                    })
                )
                .values()
        };
        this.populationDetails.N = this.populationDetails.population.length;

        //Instantiate ID details.
        this.IDdetails = {};

        //Retain initial data array, removing records with missing key variables.
        this.initial_data = this.raw_data.filter(function(d) {
            return (
                !/^\s*$/.test(d[_this.config.id_col]) && !/^\s*$/.test(d[_this.config.event_col])
            );
        });

        //Manually set controls' data.
        this.controls.data = this.initial_data;
        this.controls.ready = true;

        //Warn user of removed records.
        if (this.initial_data.length < this.raw_data.length)
            console.warn(
                this.raw_data.length -
                    this.initial_data.length +
                    ' records have been removed due to missing identifiers or event types.'
            );

        //Standardize invalid day and date values.
        manipulateData.call(this);

        //Default event types to 'All'.
        handleEventTypes.call(this);

        //Check other control inputs.
        checkOtherControls.call(this);

        //Check filters for non-existent or single-value variables.
        checkFilters.call(this);

        //Set default time ranges.
        setDefaultTimeRanges.call(this);
        this.time_range = this.config.time_scale === 'day' ? this.day_range : this.date_range;

        //Add data-driven tooltips.
        addDataDrivenTooltips.call(this);

        //Remove unusable data.
        cleanData.call(this);

        //Define a record for each start day and stop day.
        defineData.call(this);
    }

    function enableDisableControls() {
        var _this = this;

        //Enable/Disable controls other than ID and Event Type filters.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(control) {
                return (
                    control.value_col !== _this.config.id_col &&
                    control.option !== 'event_highlighted' &&
                    control.option !== 'time_scale' &&
                    control.value_col !== _this.config.event_col
                );
            })
            .classed('hidden', !!this.selected_id);
    }

    function updateIDfilter() {
        var _this = this;

        //Update ID filter.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(control) {
                return control.value_col === _this.config.id_col;
            })
            .selectAll('option')
            .property('selected', function(option) {
                return option === _this.selected_id;
            });
        this.filters.filter(function(filter) {
            return filter.col === _this.config.id_col;
        })[0].val =
            this.selected_id || 'All';
    }

    function backButton() {
        var _this = this;

        delete this.selected_id;

        enableDisableControls.call(this);
        updateIDfilter.call(this);

        //Hide ID timelines.
        this.IDdetails.wrap.classed('hidden', true);
        this.IDtimeline.wrap.classed('hidden', true);
        this.listing.wrap.classed('hidden', true);
        this.backButton.classed('hidden', true);

        //Display population timelines.
        this.populationDetails.wrap.classed('hidden', false);
        this.wrap.select('svg.wc-svg').classed('hidden', false);

        //Redraw clinical timelines.
        this.draw();

        //Highlight ID dropdown.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(control) {
                return control.description.indexOf(_this.config.id_unitPropCased) > -1;
            })
            .style({
                'font-weight': 'bold'
            })
            .transition()
            .delay(500)
            .style({
                'font-weight': 'normal'
            })
            .select('select')
            .node()
            .focus();
    }

    function detailsLayout() {
        var _this = this;

        //Add container for population details.
        this.populationDetails.wrap = this.leftSide
            .insert('div', ':first-child')
            .classed('annotation population-details', true);

        //Add container for ID characteristics.
        this.IDdetails.wrap = this.leftSide
            .insert('div', ':first-child')
            .classed('annotation ID-details hidden', true);
        this.IDdetails.wrap
            .selectAll('div.characteristic')
            .data(this.config.id_characteristics)
            .enter()
            .append('div')
            .classed('characteristic', true)
            .html(function(d) {
                return d.label + ": <span id = '" + d.value_col + "'></span>";
            });

        //Add back button to return from ID timeline to clinical timelines.
        this.backButton = this.IDdetails.wrap
            .insert('div', ':first-child')
            .classed('back-button hidden', true);
        this.backButton
            .append('button')
            .html('&#8592; Back')
            .on('click', function() {
                backButton.call(_this);
            });
    }

    function controlGroupLayout() {
        var context = this;

        this.controls.wrap.selectAll('.control-group').each(function(d) {
            var controlGroup = d3.select(this),
                label = controlGroup.select('.control-label'),
                description = controlGroup.select('.span-description'),
                container = controlGroup.append('div').classed('label-description', true);

            controlGroup.attr('class', controlGroup.attr('class') + ' ' + d.type);

            container.node().appendChild(label.node());
            container.node().appendChild(description.node());

            //Add horizontal rule to group controls and filters.
            if (d.value_col === context.config.id_col)
                context.controls.wrap
                    .insert('div', ':first-child')
                    .classed('controls horizontal-rule', true)
                    .text('Controls');
            else if (d.option === 'y.grouping') {
                var filterRule = context.controls.wrap
                    .append('div')
                    .classed('filters horizontal-rule', true)
                    .text('Filters');
                context.controls.wrap.node().insertBefore(filterRule.node(), this.nextSibling);
            }
        });
    }

    function drawIDtimeline() {
        var _this = this;

        //Hide population details.
        this.populationDetails.wrap.classed('hidden', true);

        //Display ID information.
        this.IDdetails.wrap.classed('hidden', false);
        this.IDdetails.wrap.select('#ID').text(this.selected_id);

        //Display back button.
        this.backButton.classed('hidden', false);

        //Hide clinical timelines.
        this.wrap.select('svg.wc-svg').classed('hidden', true);

        //Define ID data.
        var longIDdata = this.long_data.filter(function(d) {
                return d[_this.config.id_col] === _this.selected_id;
            }),
            wideIDdata = this.wide_data.filter(function(d) {
                return d[_this.config.id_col] === _this.selected_id;
            });

        //Draw ID characteristics.
        if (this.config.id_characteristics) {
            var id_characteristics = this.initial_data.filter(function(d) {
                return d[_this.config.id_col] === _this.selected_id;
            })[0];
            this.IDdetails.wrap.selectAll('.characteristic').each(function(d) {
                d3
                    .select(this)
                    .select('span')
                    .text(id_characteristics[d.value_col]);
            });
        }

        //Draw ID timeline.
        this.IDtimeline.wrap.classed('hidden', false);
        this.IDtimeline.wrap.selectAll('*').remove();
        webcharts.multiply(
            this.IDtimeline,
            longIDdata.filter(function(d) {
                return _this.currentEventTypes !== 'All'
                    ? _this.currentEventTypes.indexOf(d[_this.config.event_col]) > -1
                    : true;
            }),
            this.config.event_col
        );

        //Draw ID detail listing.
        this.listing.wrap.classed('hidden', false);
        this.listing.draw(
            wideIDdata.filter(function(d) {
                return _this.currentEventTypes !== 'All'
                    ? _this.currentEventTypes.indexOf(d[_this.config.event_col]) > -1
                    : true;
            })
        );
    }

    function eventHighlightingChange(select$$1, d) {
        //Update event highlighting settings.
        this.config.event_highlighted = d3
            .select(select$$1)
            .select('option:checked')
            .text();
        this.IDtimeline.config.event_highlighted = this.config.event_highlighted;

        //Redraw.
        if (this.selected_id) drawIDtimeline.call(this);
        else this.draw();
    }

    function timeScaleChange(dropdown, d) {
        //Update clinical timelines time scale settings
        this.config.time_scale = d3
            .select(dropdown)
            .select('option:checked')
            .text();
        syncTimeScaleSettings(this.config);
        this.time_range = this.config.time_scale === 'day' ? this.day_range : this.date_range;

        //Update ID timeline time scale settings
        this.IDtimeline.config.time_scale = this.config.time_scale;
        syncTimeScaleSettings(this.IDtimeline.config);

        //Remove records without time data.
        cleanData.call(this);

        //Redefine data.
        defineData.call(this);

        //Redraw.
        if (this.selected_id) drawIDtimeline.call(this);
        else this.draw();
    }

    function yAxisGrouping(select$$1, d) {
        var selected = d3.select(select$$1).select('option:checked');

        //Update grouping settings.
        if (selected.text() !== 'None') {
            this.config.y.grouping = selected.text();
            this.config.y.groupingLabel = selected.property('label');
        } else {
            delete this.config.y.grouping;
            this.config.y.groupingLabel = 'Event Types';
        }

        //Redraw.
        this.draw();
    }

    function augmentOtherControls() {
        var context = this,
            otherControls = this.controls.wrap
                .selectAll('.control-group')
                .filter(function(d) {
                    return d.type !== 'subsetter';
                })
                .classed('ct-control', true)
                .attr('id', function(d) {
                    return 'control-' + d.option.replace('.', '-');
                });

        //Relabel Y-axis sort options and remove illogical Y-axis grouping options.
        otherControls
            .filter(function(d) {
                return ['Y-axis sort', 'Y-axis grouping'].indexOf(d.description) > -1;
            })
            .each(function(d) {
                // Y-axis controls
                var options = d3.select(this).selectAll('option');

                if (d.description === 'Y-axis sort')
                    // Add labels to Y-axis sort.
                    options.property('label', function(di) {
                        return d.relabels[
                            d.values
                                .filter(function(dii) {
                                    return dii !== 'None';
                                })
                                .indexOf(di)
                        ];
                    });
                else if (d.description === 'Y-axis grouping')
                    // Add variable labels to Y-axis grouping options.
                    options.property('label', function(di) {
                        return di !== 'None'
                            ? context.config.groupings[
                                  context.config.groupings
                                      .map(function(dii) {
                                          return dii.value_col;
                                      })
                                      .indexOf(di)
                              ].label
                            : 'None';
                    });
            });

        //Redefine event highlighting event listener.
        otherControls
            .filter(function(d) {
                return d.option === 'event_highlighted';
            })
            .select('select')
            .on('change', function(d) {
                eventHighlightingChange.call(context, this, d);
            });

        //Redefine time scale event listener.
        otherControls
            .filter(function(d) {
                return d.option === 'time_scale';
            })
            .select('select')
            .on('change', function(d) {
                timeScaleChange.call(context, this, d);
            });

        //Redefine y-axis grouping event listener.
        otherControls
            .filter(function(d) {
                return d.option === 'y.grouping';
            })
            .select('select')
            .on('change', function(d) {
                yAxisGrouping.call(context, this, d);
            });
    }

    function timeRangeControl(datum) {
        var context = this,
            timeRangeContainer = this.controls.wrap
                .insert('div', '#control-y-sort')
                .datum(datum)
                .classed('control-group time-range ct-control', true)
                .attr('id', function(d) {
                    return 'control-' + d.option.replace(/\./g, '-');
                }),
            timeRangeInput = timeRangeContainer.append('input').classed('changer', true),
            timeRangeLabelDescription = timeRangeContainer
                .append('div')
                .classed('label-description', true);

        //Add control label and span description nodes.
        timeRangeLabelDescription.append('span').classed('control-label', true);
        timeRangeLabelDescription
            .append('span')
            .classed('span-description', true)
            .text(function(d) {
                return d.description;
            });

        //Add event listener to input node.
        timeRangeInput.on('change', function(d) {
            var time_range = context.config.time_scale + '_range',
                increment = context.config.time_scale === 'date' ? 24 * 60 * 60 * 1000 : 1;
            var input =
                context.config.time_scale === 'date'
                    ? d3.time.format('%Y-%m-%d').parse(this.value)
                    : +this.value;

            if (d.index === 0 && input >= context[time_range][1])
                input =
                    context.config.time_scale === 'date'
                        ? new Date(context[time_range][1].getTime() - increment)
                        : context[time_range][1] - increment;
            else if (d.index === 1 && input <= context[time_range][0])
                input =
                    context.config.time_scale === 'date'
                        ? new Date(context[time_range][0].getTime() + increment)
                        : (input = context[time_range][0] + increment);

            context[time_range][d.index] = input;
            context.time_range = context[time_range];
            context.draw();
        });
    }

    function addTimeRangeControls() {
        timeRangeControl.call(this, {
            index: 0,
            option: 'x.domain.0',
            label: '',
            description: 'Start'
        });
        timeRangeControl.call(this, {
            index: 1,
            option: 'x.domain.1',
            label: '',
            description: 'End'
        });
    }

    function IDchange(select$$1) {
        var _this = this;

        this.selected_id = d3
            .select(select$$1)
            .select('option:checked')
            .text();
        this.filters.filter(function(filter) {
            return filter.col === _this.config.id_col;
        })[0].val = this.selected_id;

        //Redraw.
        if (this.selected_id !== 'All') {
            drawIDtimeline.call(this);
        } else {
            delete this.selected_id;

            //Display population details.
            this.populationDetails.wrap.classed('hidden', false);

            //Hide ID information.
            this.IDdetails.wrap.classed('hidden', true);
            this.IDdetails.wrap.select('#ID').text('');

            //Display back button.
            this.backButton.classed('hidden', true);

            //Hide clinical timelines.
            this.wrap.select('svg.wc-svg').classed('hidden', false);
            this.draw();

            //Hide ID timeline.
            this.IDtimeline.wrap.selectAll('*').remove();
            this.IDtimeline.wrap.classed('hidden', true);

            //Draw ID detail listing.
            this.listing.draw([]);
            this.listing.wrap.classed('hidden', true);
        }

        //Update controls given the current view.
        enableDisableControls.call(this);
    }

    function eventTypeChange(select$$1) {
        var _this = this;

        this.currentEventTypes = d3
            .select(select$$1)
            .selectAll('select option:checked')
            .pop()
            .map(function(d) {
                return d.textContent;
            });
        this.filters.filter(function(filter) {
            return filter.col === _this.config.event_col;
        })[0].val = this.currentEventTypes;
        this.wrap.selectAll('.legend-item').classed('selected', function(d) {
            return _this.currentEventTypes.indexOf(d.label) > -1;
        });

        if (this.selected_id) drawIDtimeline.call(this);
        else this.draw();
    }

    function augmentFilters() {
        var _this = this;

        var context = this,
            filters = this.controls.wrap
                .selectAll('.control-group')
                .filter(function(d) {
                    return d.type === 'subsetter';
                })
                .classed('ct-filter', true)
                .attr('id', function(d) {
                    return 'filter-' + d.value_col;
                })
                .classed('ID', function(d) {
                    return d.value_col === _this.config.id_col;
                }),
            IDfilter = filters.filter(function(filter) {
                return filter.value_col === _this.config.id_col;
            }),
            eventTypeFilter = filters.filter(function(filter) {
                return filter.value_col === _this.config.event_col;
            });

        IDfilter.select('select').on('change', function(d) {
            IDchange.call(context, this);
        });

        eventTypeFilter.selectAll('select.changer option').property('selected', function(di) {
            return context.currentEventTypes instanceof Array
                ? context.currentEventTypes.indexOf(di) > -1
                : true;
        });
        eventTypeFilter.select('select').on('change', function(d) {
            eventTypeChange.call(context, this);
        });
    }

    function topXaxis() {
        this.svg
            .append('g')
            .classed('x-top axis linear', true)
            .append('text')
            .classed('axis-title top', true);
    }

    function onLayout() {
        detailsLayout.call(this);

        //Move control labels and descriptions inside a div to display them vertically, label on top of description.
        controlGroupLayout.call(this);

        //Add additional functionality to other control event listeners.
        augmentOtherControls.call(this);

        //Add time range functionality.
        addTimeRangeControls.call(this);

        //Add additional functionality to filter event listeners.
        augmentFilters.call(this);

        //Add top x-axis.
        topXaxis.call(this);
    }

    function updateTimeRangeControls() {
        var _this = this;

        var timeRangeControls = this.controls.wrap.selectAll('.time-range input');

        //Internet Explorer does not support input date type.
        if (!document.documentMode)
            timeRangeControls.property(
                'type',
                this.config.time_scale === 'date' ? 'date' : 'number'
            );

        timeRangeControls.property('value', function(d) {
            return _this.config.time_scale === 'date'
                ? d3.time.format('%Y-%m-%d')(_this.time_range[d.index])
                : +_this.time_range[d.index];
        });
    }

    function defineFilteredData() {
        var _this = this;

        //Redefine filtered data as it defaults to the final mark drawn, which might be filtered in
        //addition to the current filter selections.
        this.filtered_long_data = this.long_data.filter(function(d) {
            var filtered = false;

            _this.filters.forEach(function(di) {
                if (filtered === false && di.val !== 'All') {
                    filtered =
                        di.val instanceof Array
                            ? di.val.indexOf(d[di.col]) === -1
                            : di.val !== d[di.col];
                }
            });

            return !filtered;
        });
        this.raw_data = this.filtered_long_data;

        //Define subset of original raw data.
        this.filtered_wide_data = this.wide_data.filter(function(d) {
            var filtered = false;

            _this.filters.forEach(function(di) {
                if (filtered === false && di.val !== 'All') {
                    filtered =
                        di.val instanceof Array
                            ? di.val.indexOf(d[di.col]) === -1
                            : di.val !== d[di.col];
                }
            });

            return !filtered;
        });
    }

    function updatePopulationDetails() {
        var sample =
                "<span class = 'ct-stats sample'>" +
                this.populationDetails.n +
                "</span> of <span class = 'ct-stats'>" +
                this.populationDetails.N +
                '</span> ' +
                (this.populationDetails.N > 1 ? this.config.id_unitPlural : this.config.id_unit) +
                " (<span class = 'ct-stats'>" +
                d3.format('%')(this.populationDetails.rate) +
                "</span>) <span class = 'ct-info-icon' title = 'These " +
                this.config.id_unitPlural +
                " have data that meet the current filter criteria.'>&#9432;</span>",
            sampleInsideTimeRange =
                this.populationDetails.nInsideTimeRange < this.populationDetails.n
                    ? "<span class = 'ct-stats sample-inside-time-range'>" +
                      this.populationDetails.nInsideTimeRange +
                      "</span> of <span class = 'ct-stats sample'>" +
                      this.populationDetails.n +
                      "</span> displayed (<span class = 'ct-stats'>" +
                      d3.format('%')(this.populationDetails.rateInsideTimeRange) +
                      "</span>) <span class = 'ct-info-icon' title = 'These " +
                      this.config.id_unitPlural +
                      " have events that occur in the current time range.'>&#9432;</span>"
                    : '',
            sampleOutsideTimeRange = this.populationDetails.nOutsideTimeRange
                ? "<span class = 'ct-stats sample-outside-time-range'>" +
                  this.populationDetails.nOutsideTimeRange +
                  "</span> of <span class = 'ct-stats sample'>" +
                  this.populationDetails.n +
                  "</span> hidden (<span class = 'ct-stats'>" +
                  d3.format('%')(this.populationDetails.rateOutsideTimeRange) +
                  "</span>) <span class = 'ct-info-icon' title = 'These " +
                  this.config.id_unitPlural +
                  " do not have events that occur in the current time range.'>&#9432;</span>"
                : '';

        this.populationDetails.wrap.html(
            [sample, sampleInsideTimeRange, sampleOutsideTimeRange].join('</br>')
        );
    }

    function definePopulationDetails() {
        var _this = this;

        //Define sample given current filters.
        this.populationDetails.sample = d3
            .set(
                this.filtered_wide_data.map(function(d) {
                    return d[_this.config.id_col];
                })
            )
            .values()
            .map(function(ID) {
                var IDobject = {
                    ID: ID,
                    data: _this.filtered_wide_data.filter(function(d) {
                        return ID === d[_this.config.id_col];
                    })
                };

                IDobject.dataInsideTimeRange = IDobject.data.filter(function(d) {
                    var st = _this.config.time_function(d[_this.config.st_col]),
                        en = _this.config.time_function(d[_this.config.en_col]),
                        stInsideTimeRange =
                            _this.config.x.domain[0] <= st && st <= _this.config.x.domain[1],
                        // start is within the time range
                        enInsideTimeRange =
                            _this.config.x.domain[0] <= en && en <= _this.config.x.domain[1],
                        // end is within the time range
                        surroundingTimeRange =
                            _this.config.x.domain[0] > st && en > _this.config.x.domain[1]; // start is prior to time range and end is after time range

                    return stInsideTimeRange || enInsideTimeRange || surroundingTimeRange;
                });

                return IDobject;
            });
        this.populationDetails.n = this.populationDetails.sample.length;
        this.populationDetails.rate = this.populationDetails.n / this.populationDetails.N;

        //Define sample given current filters of IDs with an event inside the current time range.
        this.populationDetails.sampleInsideTimeRange = this.populationDetails.sample
            .filter(function(d) {
                return d.dataInsideTimeRange.length;
            })
            .map(function(d) {
                return d.ID;
            });
        this.populationDetails.nInsideTimeRange = this.populationDetails.sampleInsideTimeRange.length;
        this.populationDetails.rateInsideTimeRange =
            this.populationDetails.nInsideTimeRange / this.populationDetails.n;

        //Define sample given current filters of IDs without an event inside the current time range.
        this.populationDetails.sampleOutsideTimeRange = this.populationDetails.sample
            .filter(function(d) {
                return !d.dataInsideTimeRange.length;
            })
            .map(function(d) {
                return d.ID;
            });
        this.populationDetails.nOutsideTimeRange = this.populationDetails.sampleOutsideTimeRange.length;
        this.populationDetails.rateOutsideTimeRange =
            this.populationDetails.nOutsideTimeRange / this.populationDetails.n;

        //Update population details.
        updatePopulationDetails.call(this);
    }

    function defineDataInsideTimeRange() {
        var _this = this;

        this.longDataInsideTimeRange = this.filtered_long_data.filter(function(d) {
            return (
                _this.populationDetails.sampleInsideTimeRange.indexOf(d[_this.config.id_col]) > -1
            );
        });
        this.raw_data = this.longDataInsideTimeRange;
        this.wideDataInsideTimeRange = this.filtered_wide_data.filter(function(d) {
            return (
                _this.populationDetails.sampleInsideTimeRange.indexOf(d[_this.config.id_col]) > -1
            );
        });
    }

    function defineGroupingData() {
        var _this = this;

        if (this.config.y.grouping) {
            //Capture each grouping and corresponding array of IDs.
            this.groupings = d3
                .set(
                    this.longDataInsideTimeRange.map(function(d) {
                        return d[_this.config.y.grouping];
                    })
                )
                .values()
                .map(function(d, i) {
                    var groupingObject = {
                        key: d,
                        IDs: []
                    };

                    if (_this.config.grouping_direction === 'horizontal') {
                        //Define datum for each grouping that looks like actual data.
                        for (var variable in _this.raw_data[0]) {
                            if (
                                [
                                    _this.config.id_col,
                                    _this.config.event_col,
                                    _this.config.seq_col,
                                    _this.config.y.grouping
                                ].indexOf(variable) === -1
                            )
                                groupingObject[variable] = '';
                            else if (variable === _this.config.id_col)
                                groupingObject[_this.config.id_col] = d;
                            else if (variable === _this.config.event_col)
                                groupingObject[_this.config.event_col] = 'Grouping';
                            else if (variable === _this.config.seq_col)
                                groupingObject[_this.config.seq_col] = '1';
                            else if (variable === _this.config.y.grouping)
                                groupingObject[_this.config.y.grouping] = d;
                        }

                        //Define both a start and end datum.
                        var groupingStart = clone(groupingObject),
                            groupingEnd = clone(groupingObject);

                        groupingStart.wc_value = _this.config.x.domain[0];
                        groupingEnd.wc_value = _this.config.x.domain[0];

                        //Push two start and two end data to raw_data to create space to annotate grouping.
                        var groupingStart1 = clone(groupingStart),
                            groupingStart2 = clone(groupingStart),
                            groupingEnd1 = clone(groupingEnd),
                            groupingEnd2 = clone(groupingEnd);

                        //Placeholder row in which to print grouping.
                        groupingStart1[_this.config.id_col] = '-g' + i + '-';
                        _this.raw_data.push(groupingStart1);
                        _this.longDataInsideTimeRange.push(groupingStart1);

                        groupingEnd1[_this.config.id_col] = '-g' + i + '-';
                        _this.raw_data.push(groupingEnd1);
                        _this.longDataInsideTimeRange.push(groupingEnd1);
                    }

                    return groupingObject;
                });
        } else delete this.groupings;
    }

    function sortYdomain() {
        var _this = this;

        /**-------------------------------------------------------------------------------------------\
      Sort y-domain by the earliest event of each ID.
    \-------------------------------------------------------------------------------------------**/

        if (this.config.y.sort === 'earliest') {
            if (this.config.y.grouping) {
                //Sort IDs by grouping then earliest event if y-axis is grouped.
                var nestedData = d3
                    .nest()
                    .key(function(d) {
                        return d[_this.config.y.grouping] + '|' + d[_this.config.id_col];
                    })
                    .rollup(function(d) {
                        return d3.min(d, function(di) {
                            return _this.config.time_function(di[_this.config.st_col]);
                        });
                    })
                    .entries(this.longDataInsideTimeRange)
                    .sort(function(a, b) {
                        var aGrouping = a.key.split('|')[0],
                            bGrouping = b.key.split('|')[0],
                            earliestEventSort =
                                a.values > b.values
                                    ? -2
                                    : a.values < b.values ? 2 : a.key > b.key ? -1 : 1;

                        return aGrouping > bGrouping
                            ? -1
                            : aGrouping < bGrouping ? 1 : earliestEventSort;
                    }); // nest data by grouping and ID.

                //Capture list of IDs by grouping.
                nestedData.forEach(function(d) {
                    var split = d.key.split('|');

                    _this.groupings
                        .filter(function(grouping) {
                            return grouping.key === split[0];
                        })
                        .pop()
                        .IDs.push(split[1]);
                });

                //Set y-domain.
                this.config.y.domain = nestedData.map(function(d) {
                    return d.key.split('|')[1];
                });
            } else {
                //Otherwise sort IDs by earliest event.
                this.config.y.domain = d3
                    .nest()
                    .key(function(d) {
                        return d[_this.config.id_col];
                    })
                    .rollup(function(d) {
                        return d3.min(d, function(di) {
                            return _this.config.time_function(di[_this.config.st_col]);
                        });
                    })
                    .entries(this.longDataInsideTimeRange)
                    .sort(function(a, b) {
                        var earliestEventSort =
                            a.values > b.values
                                ? -2
                                : a.values < b.values ? 2 : a.key > b.key ? -1 : 1;

                        return earliestEventSort;
                    })
                    .map(function(d) {
                        return d.key;
                    });
            }
        } else {
            /**-------------------------------------------------------------------------------------------\
        Sort y-domain alphanumerically.
        \-------------------------------------------------------------------------------------------**/

            if (this.config.y.grouping) {
                //Sort IDs by grouping then alphanumerically if y-axis is grouped.
                this.config.y.domain = d3
                    .set(
                        this.longDataInsideTimeRange.map(function(d) {
                            return d[_this.config.id_col];
                        })
                    )
                    .values()
                    .sort(function(a, b) {
                        var aGrouping = _this.raw_data.filter(function(d) {
                                return d[_this.config.id_col] === a;
                            })[0][_this.config.y.grouping],
                            bGrouping = _this.raw_data.filter(function(d) {
                                return d[_this.config.id_col] === b;
                            })[0][_this.config.y.grouping],
                            alphanumericSort = a > b ? -1 : 1;

                        return aGrouping > bGrouping
                            ? -1
                            : aGrouping < bGrouping ? 1 : alphanumericSort;
                    });

                this.config.y.domain.forEach(function(d) {
                    _this.groupings
                        .filter(function(grouping) {
                            return (
                                grouping.key ===
                                _this.raw_data.filter(function(di) {
                                    return di[_this.config.id_col] === d;
                                })[0][_this.config.y.grouping]
                            );
                        })
                        .pop()
                        .IDs.push(d);
                });
            } else {
                //Otherwise sort IDs alphanumerically.
                this.config.y.domain = this.populationDetails.sampleInsideTimeRange.sort(function(
                    a,
                    b
                ) {
                    var alphanumericSort = a > b ? -1 : 1;

                    return alphanumericSort;
                });
            }
        }
    }

    function onPreprocess() {
        this.config.x.domain = this.time_range;

        //Set x-domain.
        updateTimeRangeControls.call(this);

        //Define filtered data irrespective of individual mark filtering.
        defineFilteredData.call(this);

        //Define population details data.
        definePopulationDetails.call(this);

        //Define data inside time range.
        defineDataInsideTimeRange.call(this);

        //Insert groupings into data to draw empty rows in which to draw groupings.
        defineGroupingData.call(this);

        //Sort y-axis based on `Sort IDs` control selection.
        sortYdomain.call(this);
    }

    function onDatatransform() {}

    function onDraw() {}

    function legendFilter() {
        var _this = this;

        //Filter data by clicking on legend.
        var context = this,
            eventTypeFilter = this.filters.filter(function(filter) {
                return filter.col === _this.config.event_col;
            })[0],
            // event type filter object
            eventTypeControl = this.controls.wrap.selectAll('.control-group').filter(function(d) {
                return d.description === 'Event Type';
            }),
            // event type control
            eventTypes = eventTypeControl.selectAll('.changer option').sort(function(a, b) {
                return _this.config.color_dom.indexOf(a) - _this.config.color_dom.indexOf(b);
            }),
            // event type options
            legendItems = this.wrap
                .selectAll('.legend-item')
                .classed('ct-button', true)
                .classed('selected', function(d) {
                    return eventTypeFilter.val instanceof Array
                        ? eventTypeFilter.val.indexOf(d.label) > -1
                        : true;
                })
                .classed('hidden', function(d) {
                    return d.label === 'None';
                }); // Remove None legend item; not sure why it's showing up.

        //Add event listener to legend items.
        legendItems.on('click', function(d) {
            var legendItem = d3.select(this),
                // clicked legend item
                selected = !legendItem.classed('selected'); // selected boolean

            legendItem.classed('selected', selected); // toggle selected class

            var selectedLegendItems = legendItems
                .filter(function() {
                    return d3.select(this).classed('selected');
                })
                .data()
                .map(function(d) {
                    return d.label;
                }); // selected event types

            eventTypes
                .property('selected', false)
                .filter(function(d) {
                    return selectedLegendItems.indexOf(d) > -1;
                })
                .property('selected', true); // sync selected options in event type filter with selected legend items

            eventTypeFilter.val = selectedLegendItems; // update filter object
            context.currentEventTypes = selectedLegendItems;

            if (context.selected_id) drawIDtimeline.call(context);
            else context.draw();
        });
    }

    function drawTopXaxis() {
        var topXaxis = d3.svg
                .axis()
                .scale(this.x)
                .orient('top')
                .ticks(this.xAxis.ticks()[0])
                .tickFormat(this.config.x_displayFormat)
                .innerTickSize(this.xAxis.innerTickSize())
                .outerTickSize(this.xAxis.outerTickSize()),
            topXaxisSelection = this.svg.select('g.x-top.axis').attr('class', 'x-top axis linear');
        topXaxisSelection.call(topXaxis);
        topXaxisSelection
            .select('text.axis-title.top')
            .attr({
                transform: 'translate(' + this.plot_width / 2 + ',' + -this.margin.top / 2 + ')',
                'text-anchor': 'middle'
            })
            .text(this.config.x.label);
    }

    function tickClick() {
        var _this = this;

        this.svg
            .selectAll('.y.axis .tick')
            .each(function(d) {
                if (/^-g\d+-/.test(d)) d3.select(this).remove();
            })
            .on('click', function(d) {
                _this.selected_id = d;

                drawIDtimeline.call(_this);
                enableDisableControls.call(_this);
                updateIDfilter.call(_this);

                //Highlight ID dropdown.
                _this.controls.wrap
                    .selectAll('.control-group')
                    .filter(function(control) {
                        return control.value_col === _this.config.id_col;
                    })
                    .style({
                        'font-weight': 'bold'
                    })
                    .transition()
                    .delay(500)
                    .style({
                        'font-weight': 'normal'
                    })
                    .select('select')
                    .node()
                    .focus();
            });
    }

    function horizontally() {
        var _this = this;

        this.groupings
            .sort(function(a, b) {
                return a.key < b.key ? -1 : 1;
            })
            .forEach(function(d, i) {
                if (d.IDs.length) {
                    var nIDs = d.IDs.length,
                        firstID = d.IDs[nIDs - 1],
                        y1 = _this.y(firstID),
                        y2 = _this.y(d.IDs[0]),
                        g = _this.svg
                            .append('g')
                            .classed('grouping horizontal', true)
                            .attr('id', d.key.replace(/ /g, '-')),
                        annotation = g
                            .append('text')
                            .classed('annotation', true)
                            .attr({
                                x: 0,
                                y: y1,
                                dy: _this.y.rangeBand() * 1.25
                            })
                            .text(_this.config.y.groupingLabel + ': ' + d.key),
                        rule = g
                            .append('line')
                            .classed('boundary horizontal', true)
                            .attr({
                                x1: 0,
                                y1: y1 + _this.y.rangeBand() / 4,
                                x2: _this.plot_width,
                                y2: y1 + _this.y.rangeBand() / 4
                            });
                }
            });
    }

    function vertically() {
        var _this = this;

        this.groupings.forEach(function(d) {
            if (d.IDs.length) {
                var nIDs = d.IDs.length,
                    firstID = d.IDs[nIDs - 1],
                    y1 = _this.y(firstID),
                    y2 = _this.y(d.IDs[0]),
                    g = _this.svg
                        .append('g')
                        .classed('grouping vertical', true)
                        .attr('id', d.key.replace(/ /g, '-')),
                    topBoundary = g
                        .append('line')
                        .classed('boundary horizontal', true)
                        .attr({
                            x1: _this.plot_width,
                            x2: _this.plot_width + _this.margin.right / 8,
                            y1: y1 + 3 * _this.y.rangeBand() / 4,
                            y2: y1 + 3 * _this.y.rangeBand() / 4
                        }),
                    span = g
                        .append('line')
                        .classed('boundary vertical', true)
                        .attr({
                            x1: _this.plot_width + _this.margin.right / 8,
                            x2: _this.plot_width + _this.margin.right / 8,
                            y1: y1 + 3 * _this.y.rangeBand() / 4,
                            y2: y2 + _this.y.rangeBand()
                        }),
                    bottomBoundary = g
                        .append('line')
                        .classed('boundary horizontal', true)
                        .attr({
                            x1: _this.plot_width,
                            x2: _this.plot_width + _this.margin.right / 8,
                            y1: y2 + _this.y.rangeBand(),
                            y2: y2 + _this.y.rangeBand()
                        }),
                    annotation = g
                        .append('text')
                        .classed('annotation', true)
                        .attr({
                            x: _this.plot_width,
                            dx: 4 * _this.margin.right / 8,
                            y: y1,
                            dy: _this.y.rangeBand()
                        })
                        .text(
                            _this.config.groupings.filter(function(grouping) {
                                return grouping.value_col === _this.config.y.grouping;
                            })[0].label +
                                ': ' +
                                d.key
                        );
            }
        });
    }

    function annotateGrouping() {
        //Clear grouping elements.
        this.svg.selectAll('.grouping').remove();

        if (this.config.y.grouping) {
            this.svg.selectAll('.grouping').remove();

            if (this.config.grouping_direction === 'horizontal') horizontally.call(this);
            else if (this.config.grouping_direction === 'vertical') vertically.call(this);
        }
    }

    function addStriping() {
        var context = this;
        this.svg.selectAll('.ct-stripe').remove();
        var yAxisGridLines = this.svg.selectAll('.y.axis .tick').each(function(d, i) {
            d3
                .select(this)
                .select('text')
                .attr('dy', context.y.rangeBand() / 2);
            d3
                .select(this)
                .insert('rect', ':first-child')
                .attr({
                    id: d,
                    x: -context.margin.left,
                    y: -context.config.marks[0].attributes['stroke-width'],
                    width: context.plot_width + context.margin.left,
                    height:
                        context.y.rangeBand() + context.config.marks[0].attributes['stroke-width']
                })
                .classed('ct-stripe', true);
        });
    }

    function offsetCircles(mark, markData) {
        var _this = this;

        //Nest data by timepoint and filter on any nested object with more than one datum.
        var overlapping = d3
            .nest()
            .key(function(d) {
                return d.total + '|' + d.values.raw[0][_this.config.id_col];
            })
            .rollup(function(d) {
                return {
                    n: d.length,
                    keys: d.map(function(di) {
                        return di.key;
                    })
                };
            })
            .entries(markData)
            .filter(function(d) {
                return d.values.n > 1;
            });

        //For each timepoint with more than one event...
        overlapping.forEach(function(d) {
            var x = d.key.split('|')[0],
                // timepoint
                y = d.key.split('|')[1]; // ID

            //For each overlapping point...
            d.values.keys.forEach(function(di, i) {
                //Capture point via its class name and offset vertically.
                var className = di + ' point',
                    g = d3.select(document.getElementsByClassName(className)[0]),
                    point = g.select('circle');
                g.attr('transform', 'translate(0,' + i * +mark.radius * 2 + ')');
            });
        });
    }

    function offsetLines(mark, markData) {
        var _this = this;

        //Nest data by time interval and filter on any nested object with more than one datum.
        var IDdata = d3
            .nest()
            .key(function(d) {
                return d.values[0].values.raw[0][_this.config.id_col];
            })
            .key(function(d) {
                return d.key;
            })
            .rollup(function(d) {
                //Expose start and end point of line.
                return _this.config.time_scale === 'day'
                    ? {
                          x1: +d[0].values[0].key,
                          x2: +d[0].values[1].key
                      }
                    : {
                          x1: new Date(d[0].values[0].key),
                          x2: new Date(d[0].values[1].key)
                      };
            })
            .entries(
                markData.filter(function(d) {
                    return d.values.length > 1;
                })
            );

        //For each ID...
        IDdata.forEach(function(IDdatum) {
            var lineData = IDdatum.values;

            //Attach line x-coordinates to line object.
            lineData.forEach(function(lineDatum) {
                lineDatum.x1 = lineDatum.values.x1;
                lineDatum.x2 = lineDatum.values.x2;
                delete lineDatum.values;
            });

            //Capture all line x-coordinates in an array.
            var lineCoordinates = lineData.map(function(di) {
                    return [di.x1, di.x2];
                }),
                overlappingLines = lineData
                    .filter(function(lineDatum) {
                        var overlap = lineCoordinates.filter(function(lineCoordinate) {
                            return (
                                (lineCoordinate[0] <= lineDatum.x1 &&
                                    lineCoordinate[1] >= lineDatum.x1) ||
                                (lineDatum.x1 <= lineCoordinate[0] &&
                                    lineDatum.x2 >= lineCoordinate[0]) ||
                                (lineCoordinate[0] <= lineDatum.x2 &&
                                    lineCoordinate[1] >= lineDatum.x2) ||
                                (lineDatum.x1 <= lineCoordinate[1] &&
                                    lineDatum.x2 >= lineCoordinate[1])
                            );
                        });

                        return overlap.length > 1;
                    })
                    .sort(function(a, b) {
                        var x1diff = a.x1 - b.x1,
                            x2diff = b.x2 - a.x2;
                        return x1diff !== 0
                            ? x1diff
                            : x2diff !== 0 ? x2diff : a.key < b.key ? -1 : 1;
                    });

            if (overlappingLines.length) {
                var currentlyOverlappingLines = [];

                //For each overlapping line...
                overlappingLines.forEach(function(currentLine, i) {
                    if (i === 0) {
                        currentLine.offset = 0;
                        currentlyOverlappingLines.push(currentLine);
                    } else {
                        currentlyOverlappingLines.forEach(function(d) {
                            var currLapsPrevX1 = currentLine.x1 <= d.x1 && currentLine.x2 >= d.x1,
                                currLapsPrevX2 = currentLine.x1 <= d.x2 && currentLine.x2 >= d.x2,
                                currLapsPrev = currentLine.x1 <= d.x1 && currentLine.x2 >= d.x2,
                                prevLapsCurrX1 = d.x1 <= currentLine.x1 && d.x2 >= currentLine.x1,
                                prevLapsCurrX2 = d.x1 <= currentLine.x2 && d.x2 >= currentLine.x2,
                                prevLapsCurr = d.x1 <= currentLine.x1 && d.x2 >= currentLine.x2;

                            d.overlapping =
                                currLapsPrevX1 ||
                                currLapsPrevX2 ||
                                currLapsPrev ||
                                prevLapsCurrX1 ||
                                prevLapsCurrX2 ||
                                prevLapsCurr;
                        });
                        var nOverlapping = currentlyOverlappingLines.filter(function(d) {
                            return d.overlapping;
                        }).length;

                        //if no lines are currently overlapping reset currently overlapping lines
                        if (nOverlapping === 0) {
                            currentLine.offset = 0;
                            currentlyOverlappingLines = [currentLine];
                        } else if (nOverlapping === currentlyOverlappingLines.length) {
                            //else if all lines are currently overlapping increase offset and add current line to currently overlapping lines
                            currentLine.offset =
                                d3.max(currentlyOverlappingLines, function(d) {
                                    return d.offset;
                                }) + 1;
                            currentlyOverlappingLines.push(currentLine);
                        } else {
                            //otherwise replace non-overlapping line with the smallest offset with current line
                            currentlyOverlappingLines.forEach(function(d, i) {
                                d.index = i;
                            });
                            var minOffset = d3.min(
                                    currentlyOverlappingLines.filter(function(d) {
                                        return !d.overlapping;
                                    }),
                                    function(d) {
                                        return d.offset;
                                    }
                                ),
                                minIndex = currentlyOverlappingLines.filter(function(d) {
                                    return d.offset === minOffset;
                                })[0].index;
                            currentLine.offset = minOffset;
                            currentlyOverlappingLines.splice(minIndex, 1, currentLine);
                        }
                    }

                    //Offset lines.
                    if (currentLine.offset > 0) {
                        //Capture line via its class name and offset vertically.
                        var className = currentLine.key + ' line',
                            g = d3.select(document.getElementsByClassName(className)[0]);
                        g.attr(
                            'transform',
                            'translate(0,' +
                                currentLine.offset * +mark.attributes['stroke-width'] * 1.5 +
                                ')'
                        );
                    } else {
                        //Capture line via its class name and offset vertically.
                        var _className = currentLine.key + ' line',
                            _g = d3.select(document.getElementsByClassName(_className)[0]);
                        _g.attr('transform', 'translate(0,0)');
                    }
                });
            }
        });
    }

    function offsetOverlappingMarks() {
        var _this = this;

        this.config.marks.forEach(function(mark, i) {
            var markData = _this.marks[i].data;
            if (mark.type === 'line') {
                //Identify marks which represent ongoing events.
                if (_this.config.ongo_col)
                    markData.forEach(function(d) {
                        d.ongoing = d.values[0].values.raw[0][_this.config.ongo_col];
                    });
                offsetLines.call(_this, mark, markData);
            } else if (mark.type === 'circle') {
                offsetCircles.call(_this, mark, markData);
            }
        });
    }

    function highlightMarks() {
        var _this = this;

        var context = this;

        //Clear line overlays.
        this.svg.selectAll('.highlight-overlay').remove();

        //Highlight legend.
        this.wrap.selectAll('.legend-item').classed('highlighted', function(d) {
            return d.label === _this.config.event_highlighted;
        });

        //Select marks.
        var highlightedMarks = this.svg
            .selectAll('.wc-data-mark, .ongoing-event')
            .classed('highlighted', function(d) {
                return d.key.indexOf(_this.config.event_highlighted) > -1;
            })
            .filter(function(d) {
                return d.key.indexOf(_this.config.event_highlighted) > -1;
            });

        //Highlight Lines.
        var paths = highlightedMarks.filter(function() {
            return (
                this.tagName === 'path' && this.getAttribute('class').indexOf('highlighted') > -1
            );
        });
        paths.each(function(d, i) {
            var g = d3.select(this.parentNode),
                x1 = context.x(context.config.time_function(d.values[0].key)),
                x2 = context.x(context.config.time_function(d.values[1].key)),
                y =
                    context.y(
                        d.values[0].values.raw[0][
                            context.config.y.column === context.config.id_col
                                ? context.config.id_col
                                : context.config.seq_col
                        ]
                    ) +
                    context.y.rangeBand() / 2,
                color = context.config.event_highlight_color,
                line = g
                    .append('line')
                    .classed('highlight-overlay', true)
                    .attr({
                        x1: x1,
                        x2: x2,
                        y1: y,
                        y2: y,
                        stroke: color,
                        'clip-path': 'url(#' + context.id + ')'
                    });

            if (d.ongoing === context.config.ongo_val) {
                var arrow = [[x2 + 7, y], [x2, y - 2.5], [x2, y + 2.5]],
                    polygon = g
                        .append('polygon')
                        .datum(d)
                        .classed('highlighted ongoing-event', true)
                        .attr({
                            points: arrow
                                .map(function(coordinate) {
                                    return coordinate.join(',');
                                })
                                .join(' '),
                            fill: color
                        });
            }
        });

        //Highlight circles.
        var circles = highlightedMarks.filter(function() {
            return (
                this.tagName === 'circle' && this.getAttribute('class').indexOf('highlighted') > -1
            );
        });
        circles.attr({
            stroke: function stroke(d) {
                return _this.colorScale(d.values.raw[0][_this.config.event_col]);
            },
            fill: function fill(d) {
                return _this.config.event_highlight_color;
            }
        });
    }

    function drawOngoingMarks() {
        var _this = this;

        if (this.raw_data.length && this.raw_data[0].hasOwnProperty(this.config.ongo_col)) {
            var context = this;

            this.svg.selectAll('.ongoing-event').remove();
            this.svg
                .selectAll('.line-supergroup .line')
                .filter(function(d) {
                    return d.ongoing === _this.config.ongo_val;
                })
                .each(function(d) {
                    var g = d3.select(this),
                        endpoint = d.values[1],
                        x = context.x(context.config.time_function(endpoint.key)),
                        y = context.y(endpoint.values.y) + context.y.rangeBand() / 2,
                        color = context.colorScale(
                            endpoint.values.raw[0][context.config.event_col]
                        ),
                        arrow = [[x + 8, y], [x, y - 3], [x, y + 3]];

                    g
                        .append('polygon')
                        .datum(d)
                        .classed('ongoing-event', true)
                        .attr({
                            points: arrow
                                .map(function(coordinate) {
                                    return coordinate.join(',');
                                })
                                .join(' '),
                            fill: color,
                            stroke: color,
                            'clip-path': 'url(#' + context.id + ')'
                        });
                });
        }
    }

    function offsetBottomXaxis() {
        var //capture x-axis and its translation coordinates
            bottomXaxis = this.svg.select('.x.axis'),
            bottomXaxisTransform = bottomXaxis
                .attr('transform')
                .replace(/^translate\((.*)\)$/, '$1'),
            bottomXaxisTransformCoordinates =
                bottomXaxisTransform.indexOf(',') > -1
                    ? bottomXaxisTransform.split(',')
                    : bottomXaxisTransform.split(' '),
            //capture x-axis title and its translation coordinates
            bottomXaxisTitle = bottomXaxis.select('.axis-title'),
            bottomXaxisTitleTransform = bottomXaxisTitle
                .attr('transform')
                .replace(/^translate\((.*)\)$/, '$1'),
            bottomXaxisTitleTransformCoordinates =
                bottomXaxisTitleTransform.indexOf(',') > -1
                    ? bottomXaxisTitleTransform.split(',')
                    : bottomXaxisTitleTransform.split(' ');

        //offset x-axis
        bottomXaxis.attr(
            'transform',
            'translate(' +
                +bottomXaxisTransformCoordinates[0] +
                ',' +
                (+bottomXaxisTransformCoordinates[1] + this.y.rangeBand()) +
                ')'
        );

        //offset x-axis title
        bottomXaxisTitle.attr(
            'transform',
            'translate(' +
                +bottomXaxisTitleTransformCoordinates[0] +
                ',' +
                (+bottomXaxisTitleTransformCoordinates[1] - 7 * this.margin.bottom / 16) +
                ')'
        );
    }

    function drawReferenceTable(reference_line) {
        var _this = this;

        //Filter data on events that overlap reference line.
        reference_line.wide_data = this.filtered_wide_data.filter(function(d) {
            return (
                _this.config.x_parseFormat.parse(d[_this.config.st_col]) <=
                    _this.config.x_parseFormat.parse(reference_line.timepoint) &&
                _this.config.x_parseFormat.parse(d[_this.config.en_col]) >=
                    _this.config.x_parseFormat.parse(reference_line.timepoint)
            );
        });

        //Nest data by grouping and event type.
        reference_line.nested_data = d3
            .nest()
            .key(function(d) {
                return d[_this.config.y.grouping] || 'All ' + _this.config.id_unitPlural;
            })
            .key(function(d) {
                return d[_this.config.event_col];
            })
            .rollup(function(d) {
                return d.length;
            })
            .entries(reference_line.wide_data);
        reference_line.flattened_data = [];
        reference_line.nested_data.forEach(function(d) {
            reference_line.flattened_data.push({
                class: 'poe-higher-level',
                key: d.key,
                n: d3.sum(d.values, function(di) {
                    return di.values;
                })
            });
            d.values.forEach(function(di) {
                reference_line.flattened_data.push({
                    class: 'poe-lower-level',
                    key: di.key,
                    n: di.values
                });
            });
        });

        //Add reference table container and header.
        if (reference_line.container) reference_line.container.remove();
        reference_line.container = this.leftSide
            .append('div')
            .classed('poe-reference-line-container', true);
        reference_line.container
            .append('h3')
            .classed('poe-reference-line-header', true)
            .text(reference_line.label);

        //Add reference line table table.
        reference_line.table = reference_line.container
            .append('table')
            .classed('poe-reference-line-table', true);
        reference_line.table
            .append('tbody')
            .selectAll('tr')
            .data(reference_line.flattened_data)
            .enter()
            .append('tr')
            .each(function(d) {
                var row = d3.select(this);
                row
                    .append('td')
                    .text(d.key)
                    .attr('class', function(d) {
                        return d.class + (d.class === 'poe-lower-level' ? ' poe-indent' : '');
                    });
                row
                    .append('td')
                    .text(d.n)
                    .attr('class', function(d) {
                        return d.class;
                    });
            });
    }

    function drawReferenceLines() {
        var _this = this;

        if (this.config.reference_lines) {
            this.svg.select('.reference-lines').remove();
            var referenceLinesGroup = this.svg
                .insert('g', '#clinical-timelines .wc-chart .wc-svg .line-supergroup')
                .classed('reference-lines', true);

            //Append reference line for each item in config.reference_lines.
            this.config.reference_lines
                .filter(function(reference_line) {
                    return reference_line.time_scale === _this.config.time_scale;
                })
                .forEach(function(reference_line, i) {
                    var referenceLineGroup = referenceLinesGroup
                            .append('g')
                            .classed('reference-line', true)
                            .attr('id', 'reference-line-' + i),
                        timepoint = _this.config.time_function(reference_line.timepoint),
                        x = _this.x(timepoint),
                        y2 =
                            _this.plot_height +
                            (_this.config.y.column === _this.config.id_col
                                ? _this.y.rangeBand()
                                : 0),
                        visibleReferenceLine = referenceLineGroup
                            .append('line')
                            .classed('visible-reference-line', true)
                            .attr({
                                x1: x,
                                x2: x,
                                y1: 0,
                                y2: y2,
                                'clip-path': 'url(#' + _this.id + ')'
                            }),
                        invisibleReferenceLine = referenceLineGroup
                            .append('line')
                            .classed('invisible-reference-line', true)
                            .attr({
                                x1: x,
                                x2: x,
                                y1: 0,
                                y2: y2,
                                'clip-path': 'url(#' + _this.id + ')'
                            }),
                        // invisible reference line has no dasharray and is much thicker to make hovering easier
                        direction =
                            reference_line.timepoint <= (_this.x_dom[1] - _this.x_dom[0]) / 2
                                ? 'right'
                                : 'left',
                        referenceLineLabel = referenceLineGroup
                            .append('text')
                            .classed('reference-line-label', true)
                            .attr({
                                x: x,
                                y: 0,
                                'text-anchor': direction === 'right' ? 'beginning' : 'end',
                                dx: direction === 'right' ? 15 : -15,
                                dy: _this.config.range_band * (_this.parent ? 1.5 : 1),
                                'clip-path': 'url(#' + _this.id + ')'
                            })
                            .text(reference_line.label),
                        dimensions = referenceLineLabel.node().getBBox(),
                        referenceLineLabelBox = referenceLineGroup
                            .insert('rect', '.reference-line-label')
                            .classed('reference-line-label-box', true)
                            .attr({
                                x: dimensions.x - 10,
                                y: dimensions.y - 5,
                                width: dimensions.width + 20,
                                height: dimensions.height + 10,
                                'clip-path': 'url(#' + _this.id + ')'
                            });

                    //Display reference line label on hover.
                    invisibleReferenceLine
                        .on('mouseover', function() {
                            visibleReferenceLine.classed('hover', true);
                            referenceLineLabel.classed('hidden', false);
                            referenceLineLabelBox.classed('hidden', false);
                            _this.svg.node().appendChild(referenceLineLabelBox.node());
                            _this.svg.node().appendChild(referenceLineLabel.node());
                        })
                        .on('mouseout', function() {
                            visibleReferenceLine.classed('hover', false);
                            referenceLineLabel.classed('hidden', true);
                            referenceLineLabelBox.classed('hidden', true);
                            referenceLineGroup.node().appendChild(referenceLineLabelBox.node());
                            referenceLineGroup.node().appendChild(referenceLineLabel.node());
                        });

                    //Hide reference labels initially.
                    referenceLineLabel.classed('hidden', true);
                    referenceLineLabelBox.classed('hidden', true);

                    drawReferenceTable.call(_this, reference_line);
                });
        }
    }

    function IEsucks() {
        if (!!document.documentMode)
            this.svg.selectAll('.line,.point').each(function(d) {
                var mark = d3.select(this),
                    tooltip = mark.select('title'),
                    text = tooltip.text().split('\n');
                tooltip.text(text.join('--|--'));
            });
    }

    function onResize() {
        legendFilter.call(this);

        //Draw second x-axis at top of chart.
        drawTopXaxis.call(this);

        //Draw second chart when y-axis tick label is clicked.
        tickClick.call(this);

        //Annotate grouping.
        annotateGrouping.call(this);

        //Distinguish each timeline with striping.
        addStriping.call(this);

        //Offset overlapping marks.
        offsetOverlappingMarks.call(this);

        //Draw ongoing marks.
        drawOngoingMarks.call(this);

        //Highlight marks.
        highlightMarks.call(this);

        //Draw ongoing marks.
        drawOngoingMarks.call(this);

        //Offset bottom x-axis to prevent overlap with final ID.
        offsetBottomXaxis.call(this);

        //Draw reference lines.
        drawReferenceLines.call(this);

        //Replace newline characters with html line break entities to cater to Internet Explorer.
        IEsucks.call(this);
    }

    function onDestroy() {}

    var callbacks = {
        onInit: onInit,
        onLayout: onLayout,
        onPreprocess: onPreprocess,
        onDatatransform: onDatatransform,
        onDraw: onDraw,
        onResize: onResize,
        onDestroy: onDestroy
    };

    function onInit$1() {
        var _this = this;

        this.config.color_dom = this.parent.clinicalTimelines.config.color_dom;
        this.config.legend.order = this.parent.clinicalTimelines.config.legend.order;
        this.config.x.domain = null;
        this.config.marks.forEach(function(mark) {
            mark.attributes['clip-path'] = 'url(#' + _this.id + ')';
        });
    }

    function onLayout$1() {}

    function onPreprocess$1() {}

    function onDatatransform$1() {}

    function onDraw$1() {
        var wrapWidth = +this.wrap.style('width').replace(/[^\d.]/g, ''),
            newWidth = wrapWidth * 0.75;
        this.raw_width = newWidth;
    }

    function drawTimeRange() {
        var _this = this;

        this.svg.select('.time-range').remove();
        var x_dom = this.x_dom.map(function(x) {
                return x instanceof Date ? x.getTime() : x;
            }),
            timeRange =
                this.parent.clinicalTimelines.config.time_scale === 'day'
                    ? this.parent.clinicalTimelines.day_range
                    : this.parent.clinicalTimelines.date_range.map(function(dt) {
                          return dt.getTime();
                      }),
            timeRangeText =
                this.config.time_scale === 'day'
                    ? this.parent.clinicalTimelines.day_range.map(function(dy) {
                          return dy.toString();
                      })
                    : this.parent.clinicalTimelines.date_range.map(function(dt) {
                          return d3.time.format(
                              _this.parent.clinicalTimelines.config.date_format
                          )(dt);
                      }); // update to date_display_format at some point

        if (
            (x_dom[0] !== timeRange[0] || x_dom[1] !== timeRange[1]) &&
            ((timeRange[0] >= x_dom[0] && timeRange[0] <= x_dom[1]) || // left side of time range overlaps x-domain
            (timeRange[1] >= x_dom[0] && timeRange[1] <= x_dom[1]) || // right side of time range overlaps x-domain
                (timeRange[0] <= x_dom[0] && timeRange[1] >= x_dom[1])) // time range fully encompassed x-domain
        ) {
            var timeRangeGroup = this.svg
                    .insert('g', '#clinical-timelines .wc-chart .wc-svg .line-supergroup')
                    .classed('time-range', true),
                x = this.x(Math.max(timeRange[0], x_dom[0])),
                width = Math.min(this.x(timeRange[1]) - x, this.plot_width - x),
                timeRangeRect = timeRangeGroup
                    .append('rect')
                    .classed('time-range-rect', true)
                    .attr({
                        x: x,
                        y: 0,
                        width: width,
                        height: this.plot_height
                    }),
                timeRangeTooltip = timeRangeGroup
                    .append('title')
                    .text(
                        this.parent.clinicalTimelines.config.x.label +
                            ' Range: ' +
                            timeRangeText.join(' - ')
                    );
        }
    }

    function onResize$1() {
        var _this = this;

        this.wrap.select('.legend').classed('hidden', true);

        //Draw ongoing marks.
        this.config.marks.forEach(function(mark, i) {
            var markData = _this.marks[i].data;

            //Identify marks which represent ongoing events.
            if (mark.type === 'line') {
                markData.forEach(function(d) {
                    d.ongoing = d.values[0].values.raw[0][_this.config.ongo_col];
                });
            }
        });
        drawOngoingMarks.call(this);

        //Annotate time range.
        drawTimeRange.call(this);

        //Draw reference lines.
        drawReferenceLines.call(this);

        //Highlight events.
        highlightMarks.call(this);

        //Replace newline characters with html line break entities to cater to Internet Explorer.
        IEsucks.call(this);
    }

    function onDestroy$1() {}

    var callbacks$1 = {
        onInit: onInit$1,
        onLayout: onLayout$1,
        onPreprocess: onPreprocess$1,
        onDatatransform: onDatatransform$1,
        onDraw: onDraw$1,
        onResize: onResize$1,
        onDestroy: onDestroy$1
    };

    function IDtimeline(clinicalTimelines) {
        var IDtimeline = webcharts.createChart(
            clinicalTimelines.rightSide.node(),
            clinicalTimelines.config.IDtimelineSettings
        );

        for (var callback in callbacks$1) {
            IDtimeline.on(callback.substring(2).toLowerCase(), callbacks$1[callback]);
        }
        IDtimeline.clinicalTimelines = clinicalTimelines;
        IDtimeline.wrap.classed('hidden', true);

        return IDtimeline;
    }

    function onInit$2() {}

    function onLayout$2() {}

    function onDraw$2() {}

    function onDestroy$2() {}

    var callbacks$2 = {
        onInit: onInit$2,
        onLayout: onLayout$2,
        onDraw: onDraw$2,
        onDestroy: onDestroy$2
    };

    function listing(clinicalTimelines) {
        var listing = webcharts.createTable(
            clinicalTimelines.rightSide.node(),
            clinicalTimelines.config.details_config
        );

        for (var callback in callbacks$2) {
            listing.on(callback.substring(2).toLowerCase(), callbacks$2[callback]);
        }
        listing.clinicalTimelines = clinicalTimelines;
        listing.init([]);
        listing.wrap.classed('hidden', true);

        return listing;
    }

    function clinicalTimelines() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments[1];

        //Define unique div within passed element argument.
        var container = d3
                .select(element)
                .append('div')
                .attr('id', 'clinical-timelines'),
            leftSide = container.append('div').attr('id', 'left-side'),
            rightSide = container.append('div').attr('id', 'right-side');

        //Define .css styles to avoid requiring a separate .css file.
        defineStyles();

        var mergedSettings = merge$1({}, defaults$1.settings, settings),
            syncedSettings = defaults$1.syncSettings(mergedSettings),
            syncedControls = defaults$1.syncControls(defaults$1.controls, syncedSettings),
            controls = webcharts.createControls(leftSide.node(), {
                location: 'top',
                inputs: syncedControls
            }),
            clinicalTimelines = webcharts.createChart(rightSide.node(), syncedSettings, controls);

        for (var callback in callbacks) {
            clinicalTimelines.on(callback.substring(2).toLowerCase(), callbacks[callback]);
        }
        clinicalTimelines.leftSide = leftSide;
        clinicalTimelines.rightSide = rightSide;
        clinicalTimelines.initialSettings = clone(syncedSettings);
        clinicalTimelines.IDtimeline = IDtimeline(clinicalTimelines);
        clinicalTimelines.listing = listing(clinicalTimelines);

        return clinicalTimelines;
    }

    return clinicalTimelines;
});
