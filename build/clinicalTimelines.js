(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('d3'), require('webcharts')))
        : typeof define === 'function' && define.amd
          ? define(['d3', 'webcharts'], factory)
          : (global.clinicalTimelines = factory(global.d3, global.webCharts));
})(this, function(d3, webcharts) {
    'use strict';

    function defineStyles() {
        var styles = [
                /***--------------------------------------------------------------------------------------\
      Global styles
    \--------------------------------------------------------------------------------------***/

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

                '#clinical-timelines > * {' +
                    '    display: inline-block;' +
                    '    padding: .5%;' +
                    '}',
                '#clinical-timelines > #left-side {' + '    width: 22%;' + '    float: left;' + '}',
                '#clinical-timelines > #right-side {' +
                    '    width: 75%;' +
                    '    float: right;' +
                    '}',
                '#clinical-timelines > * > * {' +
                    '    width: 100%;' +
                    '    padding: 1%;' +
                    '    vertical-align: top;' +
                    '    border: 1px solid #eee;' +
                    '    display: inline-block;' +
                    '    margin-bottom: 10px;' +
                    '}',

                /***--------------------------------------------------------------------------------------\
      Left side container elements
    \--------------------------------------------------------------------------------------***/

                '#clinical-timelines > #left-side > * {' + '}',

                //Annotations
                '#clinical-timelines > #left-side > .annotation {' +
                    '    font-size: small;' +
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
                '#clinical-timelines > #left-side > .wc-controls {' +
                    '    margin-bottom: 0;' +
                    '    clear: left;' +
                    '}',
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
                    '}',
                '#clinical-timelines > #left-side > .ID-details .back-button {' +
                    '    display: inline-block;' +
                    '    float: left;' +
                    '}',
                '#clinical-timelines > #left-side > .ID-details .back-button button {' +
                    '    padding: 0 5px;' +
                    '    font-size: 14px;' +
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

                //Mark highlighting
                '#clinical-timelines path.highlighted {' + '    stroke: black;' + '}',
                '#clinical-timelines line.highlight-overlay {' + '    stroke-width: 2px;' + '}',
                '#clinical-timelines circle.highlighted {' +
                    '    stroke: black;' +
                    '    stroke-width: 2px;' +
                    '}',
                '#clinical-timelines polygon.highlighted {' +
                    '    stroke: black;' +
                    '    stroke-width: 2px;' +
                    '}',

                //Grouping
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .grouping .boundary {' +
                    '    stroke: black;' +
                    '    stroke-width: 2px;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .grouping .annotation {' +
                    '    font-size: 24px;' +
                    '    font-weight: bold;' +
                    '    text-anchor: beginning;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .grouping.vertical .annotation {' +
                    '    writing-mode: tb-rl;' +
                    '}',

                //Y-axis
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .y.axis .tick {' +
                    '    cursor: pointer;' +
                    '    fill: blue;' +
                    '    text-decoration: underline;' +
                    '}',

                //Reference lines
                '#clinical-timelines .wc-chart .wc-svg title {' + '    white-space: pre;' + '}',
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .visible-reference-line {' +
                    '    stroke: black;' +
                    '    stroke-width: 2px;' +
                    '    stroke-dasharray: 2,2;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .visible-reference-line.hover {' +
                    '    stroke-dasharray: none;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .invisible-reference-line {' +
                    '    stroke: black;' +
                    '    stroke-width: 20px;' +
                    '    stroke-opacity: 0;' +
                    '}',
                '#clinical-timelines > #right-side > .wc-chart .wc-svg .reference-line-label-box {' +
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
                    '    font-size: 21px;' +
                    '    padding-left: 10px;' +
                    '    width: 24%;' +
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

    var settings = {
        /**-------------------------------------------------------------------------------------------\
      Renderer-specific settings
    \-------------------------------------------------------------------------------------------**/

        //ID settings
        id_col: 'USUBJID',
        id_unit: 'participant',
        id_characteristics: null,

        //Event settings
        event_col: 'DOMAIN',
        event_types: null,
        event_highlighted: null,

        //Filter settings
        filters: null,

        //Grouping settings
        groupings: null,
        grouping_initial: null,
        grouping_direction: 'horizontal',

        //Timing settings
        time_scale: 'Study Day',

        //Study day settings
        stdy_col: 'STDY',
        endy_col: 'ENDY',
        study_day_range: null,

        //Date settings
        stdt_col: 'STDT',
        endt_col: 'ENDT',
        date_range: null,
        date_format: '%Y-%m-%d',

        //Miscellaneous settings
        seq_col: 'SEQ',
        tooltip_col: 'TOOLTIP',
        ongo_col: 'ONGO',
        ongo_val: 'Y',
        reference_lines: null,

        //Listing settings
        details: null,
        details_config: null,

        /**-------------------------------------------------------------------------------------------\
      Standard webcharts settings
    \-------------------------------------------------------------------------------------------**/

        x: {
            type: null, // set in syncSettings()
            column: 'wc_value',
            label: null, // set in syncSettings()
            format: null // set in syncSettings()
        },
        y: {
            type: 'ordinal', // set in syncSettings()
            column: null,
            label: null,
            sort: 'earliest',
            behavior: 'flex',
            grouping: null
        },
        marks: [
            {
                type: 'line',
                per: null, // set in syncSettings()
                tooltip: null, // set in syncSettings()
                attributes: {
                    'clip-path': 'url(#1)',
                    'stroke-width': 4,
                    'stroke-opacity': 1
                }
            },
            {
                type: 'circle',
                per: null, // set in syncSettings()
                tooltip: null, // set in syncSettings()
                radius: '3',
                attributes: {
                    'clip-path': 'url(#1)',
                    fill: 'white',
                    'fill-opacity': 1,
                    'stroke-opacity': 1,
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
        gridlines: 'y',
        range_band: 24,
        margin: { top: 50 }, // for second x-axis
        resizable: false // can't be resizable so the multiples aren't overlapped by their titles
    };

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

    Number.isInteger =
        Number.isInteger ||
        function(value) {
            return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
        };

    function syncRendererSpecificSettings(settings) {
        //ID
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

        //Events
        if (!(settings.event_types instanceof Array && settings.event_types.length))
            delete settings.event_types;

        //Filters
        var defaultFilters = [
            { value_col: settings.id_col, label: settings.id_unitPropCased },
            { value_col: settings.event_col, label: 'Event Type' }
        ];
        if (settings.ongo_col)
            defaultFilters.splice(2, 0, { value_col: settings.ongo_col, label: 'Ongoing?' });
        settings.filters = arrayOfVariablesCheck(defaultFilters, settings.filters);

        //Groupings
        var defaultGroupings = [];
        settings.groupings = arrayOfVariablesCheck(defaultGroupings, settings.groupings);
        if (['horizontal', 'vertical'].indexOf(settings.grouping_direction) === -1)
            settings.grouping_direction = 'horizontal';

        //Reference lines
        if (settings.reference_lines) {
            if (!(settings.reference_lines instanceof Array))
                settings.reference_lines = [settings.reference_lines];

            settings.reference_lines = settings.reference_lines
                .map(function(reference_line) {
                    var referenceLineObject = {};
                    referenceLineObject.timepoint = reference_line.timepoint || reference_line;
                    referenceLineObject.label =
                        reference_line.label ||
                        settings.config.time_scale + ': ' + referenceLineObject.timepoint;

                    return referenceLineObject;
                })
                .filter(function(reference_line) {
                    return Number.isInteger(reference_line.timepoint);
                });

            if (!settings.reference_lines.length) delete settings.reference_lines;
        }

        //Details
        var defaultDetails =
            settings.time_scale === 'Study Day'
                ? [
                      { value_col: settings.event_col, label: 'Event Type' },
                      { value_col: settings.stdy_col, label: 'Start Day' },
                      { value_col: settings.endy_col, label: 'Stop Day' },
                      { value_col: settings.seq_col, label: 'Sequence Number' }
                  ]
                : [
                      { value_col: settings.event_col, label: 'Event Type' },
                      { value_col: settings.stdt_col, label: 'Start Date' },
                      { value_col: settings.endt_col, label: 'Stop Date' },
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
        settings.y.grouping = settings.grouping_initial;

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
        //X-axis
        settings.x.type = settings.time_scale === 'Study Day' ? 'linear' : 'time';
        settings.x.label = settings.time_scale;
        settings.x.format = settings.time_scale === 'Study Day' ? '1d' : settings.date_format;

        //Lines (events with duration)
        settings.marks[0].tooltip =
            settings.time_scale === 'Study Day'
                ? 'Event: [' +
                  settings.event_col +
                  ']' +
                  ('\nStart Day: [' + settings.stdy_col + ']') +
                  ('\nStop Day: [' + settings.endy_col + ']')
                : 'Event: [' +
                  settings.event_col +
                  ']' +
                  ('\nStart Date: [' + settings.stdt_col + ']') +
                  ('\nStop Date: [' + settings.endt_col + ']');
        settings.marks[0].values =
            settings.time_scale === 'Study Day'
                ? { wc_category: [settings.stdy_col, settings.endy_col] }
                : { wc_category: [settings.stdt_col, settings.endt_col] };

        //Circles (events without duration)
        settings.marks[1].tooltip =
            settings.time_scale === 'Study Day'
                ? 'Event: [' +
                  settings.event_col +
                  ']' +
                  ('\nStudy Day: [' + settings.stdy_col + ']')
                : 'Event: [' +
                  settings.event_col +
                  ']' +
                  ('\nStudy Date: [' + settings.stdt_col + ']');
        settings.marks[1].values =
            settings.time_scale === 'Study Day' ? { wc_category: ['DY'] } : { wc_category: ['DT'] };

        //Define right margin for vertical groupings and to prevent date tick label cutoff.
        settings.margin.right = settings.y.grouping || settings.time_scale === 'Date' ? 40 : 0;
    }

    function syncIDtimelineSettings(settings) {
        settings.x.label = '';
        settings.y.column = settings.seq_col;
        settings.y.sort = 'alphabetical-descending';
        settings.marks[0].per = [settings.event_col, settings.seq_col];
        settings.marks[1].per = [settings.event_col, settings.seq_col, 'wc_value'];
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
        syncRendererSpecificSettings(syncedSettings);
        syncWebchartsSettings(syncedSettings);
        syncTimeScaleSettings(syncedSettings);

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
            values: ['Study Day', 'Date'],
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

        //Remove records with insufficient data.
        this.wide_data = this.raw_data.filter(
            function(d) {
                return (
                    !(d.hasOwnProperty(_this.config.stdy_col) && d[_this.config.stdy_col] === '') &&
                    !(d.hasOwnProperty(_this.config.endy_col) && d[_this.config.endy_col] === '') &&
                    !(d.hasOwnProperty(_this.config.stdt_col) && d[_this.config.stdt_col] === '') &&
                    !(d.hasOwnProperty(_this.config.endt_col) && d[_this.config.endt_col] === '') &&
                    !/^\s*$/.test(d[_this.config.id_col]) && // remove records with missing [id_col]
                    !/^\s*$/.test(d[_this.config.event_col])
                );
            } // remove records with missing [event_col]
        );

        //Warn user of removed records.
        if (this.wide_data.length < this.raw_data.length) {
            console.warn(
                this.raw_data.length -
                    this.wide_data.length +
                    ' records have been removed due to invalid data.\nPossible issues include\n  - missing or invalid study day variable values\n  - missing or invalid date variable values\n  - date variable values that do not match settings.date_format (' +
                    this.config.date_format +
                    ')\n$  - missing identifiers or event types'
            );
        }

        //Separate out timepoints and time intervals.
        var timepoints = this.wide_data
                .filter(function(d) {
                    return (
                        d[_this.config.stdy_col] === d[_this.config.endy_col] ||
                        d[_this.config.stdt_col] === d[_this.config.endt_col]
                    );
                })
                .map(function(d) {
                    d.wc_category = _this.config.time_scale === 'Study Day' ? 'DY' : 'DT';
                    d.wc_value =
                        _this.config.time_scale === 'Study Day'
                            ? d[_this.config.stdy_col]
                            : d[_this.config.stdt_col];
                    return d;
                }),
            timeIntervals = lengthenRaw(
                this.wide_data.filter(function(d) {
                    return (
                        d[_this.config.stdy_col] !== d[_this.config.endy_col] ||
                        d[_this.config.stdt_col] !== d[_this.config.endt_col]
                    );
                }),
                this.config.time_scale === 'Study Day'
                    ? [this.config.stdy_col, this.config.endy_col]
                    : [this.config.stdt_col, this.config.endt_col]
            );

        this.long_data = d3.merge([timepoints, timeIntervals]);
        this.raw_data = this.long_data;
    }

    function handleEventTypes() {
        var _this = this;

        this.allEventTypes = d3
            .set(
                this.raw_data.map(function(d) {
                    return d[_this.config.event_col];
                })
            )
            .values()
            .sort();
        this.currentEventTypes = this.config.event_types || this.allEventTypes;
        this.config.color_dom =
            this.currentEventTypes !== 'All'
                ? this.currentEventTypes.concat(
                      this.allEventTypes
                          .filter(function(eventType) {
                              return _this.currentEventTypes.indexOf(eventType) === -1;
                          })
                          .sort()
                  )
                : this.allEventTypes;
        this.config.legend.order = this.config.color_dom;
    }

    function removeFilters() {
        var _this = this;

        this.controls.config.inputs = this.controls.config.inputs.filter(function(input) {
            if (input.type !== 'subsetter') {
                //Set values of Event Type highlighting control to event types present in the data.
                if (input.description === 'Event highlighting')
                    input.values = _this.config.color_dom;
                else if (input.description === 'Y-axis grouping')
                    input.values = _this.config.groupings.map(function(grouping) {
                        return grouping.value_col;
                    });

                return true;
            } else if (!_this.raw_data[0].hasOwnProperty(input.value_col)) {
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

    function removeSiteReferences() {
        var _this = this;

        if (!this.raw_data[0].hasOwnProperty(this.config.site_col)) {
            this.config.groupings = this.config.groupings.filter(function(grouping) {
                return grouping.value_col !== _this.config.site_col;
            });
            var yAxisGrouping = this.controls.config.inputs
                .filter(function(input) {
                    return input.option === 'y.grouping';
                })
                .pop();
            yAxisGrouping.values = yAxisGrouping.values.filter(function(value) {
                return value !== _this.config.site_col;
            });
            this.config.filters = this.config.filters.filter(function(filter) {
                return filter.value_col !== _this.config.site_col;
            });
            this.config.id_characteristics = this.config.id_characteristics.filter(function(
                id_characteristic
            ) {
                return id_characteristic.value_col !== _this.config.site_col;
            });
            this.listing.config.cols = this.listing.config.cols.filter(function(col) {
                return col !== _this.config.site_col;
            });
            this.listing.config.headers = this.listing.config.headers.filter(function(header) {
                return header !== 'Site';
            });
        }
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

        this.raw_data.forEach(function(d, i) {
            if (!/^ *\d+ *$/.test(d[_this.config.stdy_col])) d[_this.config.stdy_col] = '';
            if (!/^ *\d+ *$/.test(d[_this.config.endy_col]))
                d[_this.config.endy_col] = d[_this.config.stdy_col];
            if (!d3.time.format(_this.config.date_format).parse(d[_this.config.stdt_col]))
                d[_this.config.stdt_col] = '';
            if (!d3.time.format(_this.config.date_format).parse(d[_this.config.endt_col]))
                d[_this.config.endt_col] = d[_this.config.stdt_col];
        });

        //Calculate number of total IDs and number of IDs with any event.
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
        this.IDdetails = {};

        //Define a record for each start day and stop day.
        defineData.call(this);

        //Define x-domain.
        this.config.study_day_range = this.config.study_day_range || [
            d3.min(this.raw_data, function(d) {
                return d[_this.config.stdy_col];
            }),
            d3.max(this.raw_data, function(d) {
                return d[_this.config.endy_col];
            })
        ];
        this.config.date_range =
            this.config.date_range instanceof Array && this.config.date_range.length === 2
                ? this.config.date_range.map(function(date) {
                      return date instanceof Date
                          ? date
                          : d3.time.format(_this.config.date_format).parse(date);
                  })
                : [
                      d3.min(this.raw_data, function(d) {
                          return d3.time
                              .format(_this.config.date_format)
                              .parse(d[_this.config.stdt_col]);
                      }),
                      d3.max(this.raw_data, function(d) {
                          return d3.time
                              .format(_this.config.date_format)
                              .parse(d[_this.config.endt_col]);
                      })
                  ];

        //Default event types to 'All'.
        handleEventTypes.call(this);

        //Remove filters for variables fewer than two levels.
        removeFilters.call(this);

        //Remove references to site_col if column does not exist.
        removeSiteReferences.call(this);

        //Add data-driven tooltips.
        addDataDrivenTooltips.call(this);
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
        var longIDdata = this.long_data.filter(function(di) {
                return di[_this.config.id_col] === _this.selected_id;
            }),
            wideIDdata = this.wide_data.filter(function(di) {
                return di[_this.config.id_col] === _this.selected_id;
            });

        //Draw row identifier characteristics.
        if (this.config.id_characteristics)
            this.IDdetails.wrap.selectAll('div.characteristic').each(function(d) {
                d3
                    .select(this)
                    .select('span')
                    .text(wideIDdata[0][d.value_col]);
            });

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

    function IDchange(select$$1, d) {
        var filter = this.filters.filter(function(filter) {
            return filter.col === d.value_col;
        })[0];

        //Update currently selected ID and toggle view.
        this.selected_id = filter.val !== 'All' ? filter.val : null;

        //Redraw.
        if (this.selected_id && this.selected_id !== 'All') {
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

    function eventTypeChange(select$$1, d) {
        var filter = this.filters.filter(function(filter) {
            return filter.col === d.value_col;
        })[0];

        //Re-draw ID timeline if in ID timeline view.
        this.currentEventTypes = filter.val;
        if (this.selected_id) drawIDtimeline.call(this);
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
                    return d.value_col;
                })
                .classed('ID', function(d) {
                    return d.value_col === _this.config.id_col;
                });

        //Set to selected event types specified in settings.event_types and handle clinical timelines and ID timeline toggle.
        filters
            //Highlight selected event types in select.
            .each(function(d) {
                if (d.value_col === context.config.event_col)
                    d3
                        .select(this)
                        .selectAll('option')
                        .property('selected', function(di) {
                            return context.currentEventTypes instanceof Array
                                ? context.currentEventTypes.indexOf(di) > -1
                                : true;
                        });
            })
            .on('change', function(d) {
                if (d.value_col === context.config.id_col) IDchange.call(context, this, d);
                else if (d.value_col === context.config.event_col)
                    eventTypeChange.call(context, this, d);
            });
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
        var _this = this;

        //Update clinical timelines time scale settings
        this.config.time_scale = d3
            .select(dropdown)
            .select('option:checked')
            .text();
        syncTimeScaleSettings(this.config);

        //Update ID timeline time scale settings
        this.IDtimeline.config.time_scale = this.config.time_scale;
        syncTimeScaleSettings(this.IDtimeline.config);

        //Update listing time scale settings
        this.listing.config.cols = this.listing.config.cols.map(function(col) {
            if (col === _this.config.stdy_col) col = _this.config.stdt_col;
            else if (col === _this.config.stdt_col) col = _this.config.stdy_col;
            if (col === _this.config.endy_col) col = _this.config.endt_col;
            else if (col === _this.config.endt_col) col = _this.config.endy_col;

            return col;
        });
        this.listing.config.headers = this.listing.config.headers.map(function(header) {
            if (header === 'Start Day') header = 'Start Date';
            else if (header === 'Start Date') header = 'Start Day';
            if (header === 'Stop Day') header = 'Stop Date';
            else if (header === 'Stop Date') header = 'Stop Day';

            return header;
        });

        //Redefine data.
        defineData.call(this);

        //Redraw.
        if (this.selected_id) drawIDtimeline.call(this);
        else this.draw();
    }

    function augmentOtherControls() {
        var context = this,
            otherControls = this.controls.wrap
                .selectAll('.control-group')
                .filter(function(d) {
                    return d.type !== 'subsetter';
                })
                .classed('ct-control', true);

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
    }

    function onLayout() {
        var _this = this;

        var context = this;

        //Move control labels and descriptions inside a div to display them vertically, label on top of description.
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

        //Add additional functionality to filter event listeners.
        augmentFilters.call(this);

        //Add additional functionality to other control event listeners.
        augmentOtherControls.call(this);

        //Add top x-axis.
        this.svg
            .append('g')
            .classed('x-top axis linear', true)
            .append('text')
            .classed('axis-title top', true);
    }

    function defineFilteredData() {
        var _this = this;

        //Redefine filtered data as it defaults to the final mark drawn, which might be filtered in
        //addition to the current filter selections.
        this.filtered_long_data = this.raw_data.filter(function(d) {
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
                    var st =
                            _this.config.time_scale === 'Study Day'
                                ? +d[_this.config.stdy_col]
                                : d3.time
                                      .format(_this.config.date_format)
                                      .parse(d[_this.config.stdt_col]),
                        en =
                            _this.config.time_scale === 'Study Day'
                                ? +d[_this.config.endy_col]
                                : d3.time
                                      .format(_this.config.date_format)
                                      .parse(d[_this.config.endt_col]),
                        stInsideTimeRange =
                            _this.config.x.domain[0] <= st && st <= _this.config.x.domain[1],
                        // start is within the time range
                        enInsideTimeRange =
                            _this.config.x.domain[0] <= en && en <= _this.config.x.domain[1]; // end is within the time range

                    return stInsideTimeRange || enInsideTimeRange;
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

        //Capture each grouping and corresponding array of IDs.
        this.groupings = d3
            .set(
                this.longDataInsideTimeRange.map(function(d) {
                    return d[_this.config.y.grouping];
                })
            )
            .values()
            .map(function(d) {
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

                    //First placeholder row
                    groupingStart1[_this.config.id_col] = '--' + d;
                    _this.raw_data.push(groupingStart1);
                    _this.longDataInsideTimeRange.push(groupingStart1);

                    groupingEnd1[_this.config.id_col] = '--' + d;
                    _this.raw_data.push(groupingEnd1);
                    _this.longDataInsideTimeRange.push(groupingEnd1);

                    //Second placeholder row
                    groupingStart2[_this.config.id_col] = '-' + d;
                    _this.raw_data.push(groupingStart2);
                    _this.longDataInsideTimeRange.push(groupingStart2);

                    groupingEnd2[_this.config.id_col] = '-' + d;
                    _this.raw_data.push(groupingEnd2);
                    _this.longDataInsideTimeRange.push(groupingEnd2);
                }

                return groupingObject;
            });

        //range_band hack
        if (this.config.grouping_direction === 'horizontal')
            this.config.range_band =
                this.initialSettings.range_band +
                this.groupings.length *
                    2 /
                    d3
                        .set(
                            this.wideDataInsideTimeRange.map(function(d) {
                                return d[_this.config.id_col];
                            })
                        )
                        .values().length *
                    this.initialSettings.range_band;
    }

    function onPreprocess() {
        this.config.x.domain =
            this.config.time_scale === 'Study Day'
                ? this.config.study_day_range
                : this.config.date_range;

        //Reset raw data array.
        this.raw_data = this.long_data;

        //Define filtered data irrespective of individual mark filtering.
        defineFilteredData.call(this);

        //Define population details data.
        definePopulationDetails.call(this);

        //Define data inside time range.
        defineDataInsideTimeRange.call(this);

        //Insert groupings into data to draw empty rows in which to draw groupings.
        if (this.config.y.grouping) defineGroupingData.call(this);
        else {
            delete this.groupings;
            this.config.range_band = this.initialSettings.range_band;
        }
    }

    function onDatatransform() {}

    function sortYdomain() {
        var _this = this;

        /**-------------------------------------------------------------------------------------------\
      Sort y-domain by the earliest event of each ID.
    \-------------------------------------------------------------------------------------------**/

        if (this.config.y.sort === 'earliest') {
            if (this.config.y.grouping) {
                //Sort IDs by grouping then earliest event start date if y-axis is grouped.
                var nestedData = d3
                    .nest()
                    .key(function(d) {
                        return d[_this.config.y.grouping] + '|' + d[_this.config.id_col];
                    })
                    .rollup(function(d) {
                        return d3.min(d, function(di) {
                            return _this.config.time_scale === 'Study Day'
                                ? +di[_this.config.stdy_col]
                                : d3.time
                                      .format(_this.config.date_format)
                                      .parse(di[_this.config.stdt_col]);
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
                this.y_dom = nestedData.map(function(d) {
                    return d.key.split('|')[1];
                });
            } else {
                //Otherwise sort IDs by earliest event start date.
                this.y_dom = d3
                    .nest()
                    .key(function(d) {
                        return d[_this.config.id_col];
                    })
                    .rollup(function(d) {
                        return d3.min(d, function(di) {
                            return _this.config.time_scale === 'Study Day'
                                ? +di[_this.config.stdy_col]
                                : d3.time
                                      .format(_this.config.date_format)
                                      .parse(di[_this.config.stdt_col]);
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
                this.y_dom = d3
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

                this.y_dom.forEach(function(d) {
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
                this.y_dom = this.populationDetails.sampleInsideTimeRange.sort(function(a, b) {
                    var alphanumericSort = a > b ? -1 : 1;

                    return alphanumericSort;
                });
            }
        }
    }

    function onDraw() {
        sortYdomain.call(this);

        //Clear grouping elements.
        this.svg.selectAll('.grouping').remove();

        //Add right margin for vertical y-axis grouping.
        if (this.config.grouping_direction === 'vertical') {
            if (this.config.y.grouping) this.config.margin.right = 40;
            else delete this.config.margin.right;
        }

        //Update top x-axis.
        this.svg.select('g.x-top.axis text.axis-title.top').text(this.config.time_scale);
    }

    function highlightMarks() {
        var _this = this;

        var context = this;

        this.svg.selectAll('.highlight-overlay').remove();

        //Highlight legend.
        this.wrap.selectAll('.legend-item').classed('highlighted', function(d) {
            return d.label === _this.config.event_highlighted;
        });

        //Highlight marks.
        var highlightedMarks = this.svg
                .selectAll('.wc-data-mark, .ongoing-event')
                .classed('highlighted', function(d) {
                    return d.key.indexOf(_this.config.event_highlighted) > -1;
                })
                .filter(function(d) {
                    return d.key.indexOf(_this.config.event_highlighted) > -1;
                }),
            paths = highlightedMarks
                .filter(function() {
                    return (
                        this.tagName === 'path' &&
                        this.getAttribute('class').indexOf('highlighted') > -1
                    );
                })
                .each(function(d) {
                    var g = d3.select(this.parentNode),
                        line = g
                            .append('line')
                            .classed('highlight-overlay', true)
                            .attr({
                                'clip-path': 'url(#1)',
                                x1: context.x(
                                    context.config.time_scale === 'Study Day'
                                        ? +d.values[0].key
                                        : new Date(d.values[0].key)
                                ),
                                x2: context.x(
                                    context.config.time_scale === 'Study Day'
                                        ? +d.values[1].key
                                        : new Date(d.values[1].key)
                                ),
                                y1:
                                    context.y(d.values[0].values.raw[0][context.config.id_col]) +
                                    context.y.rangeBand() / 2,
                                y2:
                                    context.y(d.values[0].values.raw[0][context.config.id_col]) +
                                    context.y.rangeBand() / 2,
                                stroke: context.colorScale(
                                    d.values[0].values.raw[0][context.config.event_col]
                                )
                            });
                }),
            circles = highlightedMarks
                .filter(function() {
                    return (
                        this.tagName === 'circle' &&
                        this.getAttribute('class').indexOf('highlighted') > -1
                    );
                })
                .attr('fill', function(d) {
                    return _this.colorScale(d.values.raw[0][_this.config.event_col]);
                });
    }

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
                .tickFormat(
                    this.config.time_scale === 'Date'
                        ? d3.time.format(this.config.date_format)
                        : d3.format('1d')
                )
                .innerTickSize(this.xAxis.innerTickSize())
                .outerTickSize(this.xAxis.outerTickSize())
                .ticks(this.xAxis.ticks()[0]),
            topXaxisSelection = this.svg.select('g.x-top.axis').attr('class', 'x-top axis linear');
        topXaxisSelection.call(topXaxis);
        topXaxisSelection
            .select('text.axis-title.top')
            .attr(
                'transform',
                'translate(' +
                    (this.raw_width / 2 - this.margin.left) +
                    ',-' +
                    9 * this.config.margin.top / 16 +
                    ')'
            );
    }

    function tickClick() {
        var _this = this;

        drawIDtimeline.call(this);
        enableDisableControls.call(this);
        updateIDfilter.call(this);

        //Highlight ID dropdown.
        this.controls.wrap
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
    }

    function offsetLines(mark, markData) {
        var _this = this;

        //Nest data by study day and filter on any nested object with more than one datum.
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
                return _this.config.time_scale === 'Study Day'
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
                    }
                });
            }
        });
    }

    function offsetCircles(mark, markData) {
        var _this = this;

        //Nest data by study day and filter on any nested object with more than one datum.
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

        //For each study day with more than one event...
        overlapping.forEach(function(d) {
            var x = d.key.split('|')[0],
                // study day
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

    function horizontally() {
        var _this = this;

        this.groupings.forEach(function(d) {
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
                            dx: -_this.margin.left,
                            y: y1,
                            dy: _this.y.rangeBand() * 1.75
                        })
                        .text(d.key);
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
                            y1: y1 + _this.y.rangeBand() / 4,
                            y2: y1 + _this.y.rangeBand() / 4
                        }),
                    span = g
                        .append('line')
                        .classed('boundary vertical', true)
                        .attr({
                            x1: _this.plot_width + _this.margin.right / 8,
                            x2: _this.plot_width + _this.margin.right / 8,
                            y1: y1 + _this.y.rangeBand() / 4,
                            y2: y2 + 3 * _this.y.rangeBand() / 4
                        }),
                    bottomBoundary = g
                        .append('line')
                        .classed('boundary horizontal', true)
                        .attr({
                            x1: _this.plot_width,
                            x2: _this.plot_width + _this.margin.right / 8,
                            y1: y2 + 3 * _this.y.rangeBand() / 4,
                            y2: y2 + 3 * _this.y.rangeBand() / 4
                        }),
                    annotation = g
                        .append('text')
                        .classed('annotation', true)
                        .attr({
                            x: _this.plot_width,
                            dx: 5 * _this.margin.right / 8,
                            y: y1,
                            dy: _this.y.rangeBand() / 2
                        })
                        .text(d.key);
            }
        });
    }

    function annotateGrouping() {
        this.svg.selectAll('.grouping').remove();

        if (this.config.grouping_direction === 'horizontal') horizontally.call(this);
        else if (this.config.grouping_direction === 'vertical') vertically.call(this);
    }

    function drawOngoingMarks() {
        var _this = this;

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
                    x = context.x(
                        context.config.time_scale === 'Study Day'
                            ? +endpoint.key
                            : new Date(endpoint.key)
                    ),
                    y = context.y(endpoint.values.y) + context.y.rangeBand() / 2,
                    color = context.colorScale(endpoint.values.raw[0][context.config.event_col]),
                    arrow = [[x + 8, y], [x, y - 3], [x, y + 3]];

                g
                    .append('polygon')
                    .datum(d)
                    .classed('ongoing-event', true)
                    .attr({
                        'clip-path': 'url(#1)',
                        points: arrow
                            .map(function(coordinate) {
                                return coordinate.join(',');
                            })
                            .join(' '),
                        fill: color,
                        stroke: color
                    });
            });
    }

    function drawReferenceLines() {
        var _this = this;

        this.svg.select('.reference-lines').remove();
        var referenceLinesGroup = this.svg
            .insert('g', '#clinical-timelines .wc-chart .wc-svg .line-supergroup')
            .classed('reference-lines', true);

        //Append reference line for each item in config.reference_lines.
        this.config.reference_lines.forEach(function(reference_line, i) {
            var referenceLineGroup = referenceLinesGroup
                    .append('g')
                    .classed('reference-line', true)
                    .attr('id', 'reference-line-' + i),
                visibleReferenceLine = referenceLineGroup
                    .append('line')
                    .classed('visible-reference-line', true)
                    .attr({
                        x1: _this.x(reference_line.timepoint),
                        x2: _this.x(reference_line.timepoint),
                        y1: 0,
                        y2: _this.plot_height
                    }),
                invisibleReferenceLine = referenceLineGroup
                    .append('line')
                    .classed('invisible-reference-line', true)
                    .attr({
                        x1: _this.x(reference_line.timepoint),
                        x2: _this.x(reference_line.timepoint),
                        y1: 0,
                        y2: _this.plot_height
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
                        x: _this.x(reference_line.timepoint),
                        y: 0,
                        'text-anchor': direction === 'right' ? 'beginning' : 'end',
                        dx: direction === 'right' ? 15 : -15,
                        dy: _this.config.range_band * (_this.parent ? 1.5 : 1)
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
                        height: dimensions.height + 10
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
        });
    }

    function onResize() {
        var _this = this;

        legendFilter.call(this);

        //Draw second x-axis at top of chart.
        drawTopXaxis.call(this);

        //Offset overlapping marks.
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

        //Draw ongoing marks.
        if (this.config.ongo_col) drawOngoingMarks.call(this);

        //Highlight events.
        highlightMarks.call(this);

        //Draw second chart when y-axis tick label is clicked.
        this.svg
            .selectAll('.y.axis .tick')
            .each(function(d) {
                if (/^-/.test(d)) d3.select(this).remove();
            })
            .on('click', function(d) {
                _this.selected_id = d;
                tickClick.call(_this);
            });

        //Annotate grouping.
        if (this.config.y.grouping) annotateGrouping.call(this);

        //Draw reference lines.
        if (this.config.reference_lines) drawReferenceLines.call(this);

        //Offset bottom x-axis to prevent overlap with final ID.
        var bottomXaxis = this.svg.select('.x.axis'),
            bottomXaxisTransform = bottomXaxis.attr('transform'),
            bottomXaxisTransformX =
                bottomXaxisTransform.indexOf(',') > -1
                    ? +bottomXaxisTransform.split(',')[0].split('(')[1]
                    : +bottomXaxisTransform.split(' ')[0].split('(')[1],
            bottomXaxisTransformY =
                bottomXaxisTransform.indexOf(',') > -1
                    ? +bottomXaxisTransform.split(',')[1].split(')')[0]
                    : +bottomXaxisTransform.split(' ')[1].split(')')[0],
            bottomXaxisTitle = bottomXaxis.select('.axis-title'),
            bottomXaxisTitleTransform = bottomXaxisTitle.attr('transform'),
            bottomXaxisTitleTransformX =
                bottomXaxisTitleTransform.indexOf(',') > -1
                    ? +bottomXaxisTitleTransform.split(',')[0].split('(')[1]
                    : +bottomXaxisTitleTransform.split(' ')[0].split('(')[1],
            bottomXaxisTitleTransformY =
                bottomXaxisTitleTransform.indexOf(',') > -1
                    ? +bottomXaxisTitleTransform.split(',')[1].split(')')[0]
                    : +bottomXaxisTitleTransform.split(' ')[1].split(')')[0];
        bottomXaxis.attr(
            'transform',
            'translate(0,' + (bottomXaxisTransformY + this.y.rangeBand()) + ')'
        );
        bottomXaxisTitle.attr(
            'transform',
            'translate(' +
                bottomXaxisTitleTransformX +
                ',' +
                (bottomXaxisTitleTransformY - 7 * this.margin.bottom / 16) +
                ')'
        );

        //Replace newline characters with html line break entities to cater to Internet Explorer.
        if (!!document.documentMode)
            this.svg.selectAll('.line,.point').each(function(d) {
                console.log(d);
                var mark = d3.select(this),
                    tooltip = mark.select('title'),
                    text = tooltip.text().split('\n');
                tooltip.text(text.join('--|--'));
            });
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
        this.config.color_dom = this.parent.clinicalTimelines.config.color_dom;
        this.config.legend.order = this.parent.clinicalTimelines.config.legend.order;
    }

    function onLayout$1() {}

    function onPreprocess$1() {}

    function onDatatransform$1() {}

    function onDraw$1() {
        var wrapWidth = +this.wrap.style('width').replace(/[^\d.]/g, ''),
            newWidth = wrapWidth * 0.75;
        this.raw_width = newWidth;
    }

    function onResize$1() {
        var _this = this;

        var context = this;

        //Hide legend.
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

        //Draw reference lines.
        if (this.config.reference_lines) drawReferenceLines.call(this);

        //Highlight marks.
        this.svg.selectAll('.highlight-overlay').remove();
        this.svg
            .selectAll('.wc-data-mark, .ongoing-event')
            .classed('highlighted', function(d) {
                return d.key.indexOf(_this.parent.config.event_highlighted) > -1;
            })
            .filter(function() {
                return (
                    this.tagName === 'path' &&
                    this.getAttribute('class').indexOf('highlighted') > -1
                );
            })
            .each(function(d) {
                var g = d3.select(this.parentNode),
                    line = g
                        .append('line')
                        .classed('highlight-overlay', true)
                        .attr({
                            x1: context.x(
                                context.config.time_scale === 'Study Day'
                                    ? +d.values[0].key
                                    : new Date(d.values[0].key)
                            ),
                            x2: context.x(
                                context.config.time_scale === 'Study Day'
                                    ? +d.values[1].key
                                    : new Date(d.values[1].key)
                            ),
                            y1:
                                context.y(d.values[0].values.raw[0][context.config.seq_col]) +
                                context.y.rangeBand() / 2,
                            y2:
                                context.y(d.values[0].values.raw[0][context.config.seq_col]) +
                                context.y.rangeBand() / 2,
                            stroke: context.colorScale(
                                d.values[0].values.raw[0][context.config.event_col]
                            )
                        });
            });
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

        var mergedSettings = Object.assign({}, defaults$1.settings, settings),
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
