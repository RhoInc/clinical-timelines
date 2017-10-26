(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('d3'), require('webcharts')))
        : typeof define === 'function' && define.amd
          ? define(['d3', 'webcharts'], factory)
          : (global.clinicalTimelines = factory(global.d3, global.webCharts));
})(this, function(d3$1, webcharts) {
    'use strict';

    function defineStyles() {
        var styles = [
                '#clinical-timelines .hidden {' + '    display: none !important;' + '}',
                '#clinical-timelines .wc-controls {' +
                    '    border: 1px solid #eee;' +
                    '    padding: 5px;' +
                    '}',
                '#clinical-timelines .wc-controls .annotation {' +
                    '    float: right;' +
                    '    font-size: 16px;' +
                    '}',
                '#clinical-timelines .wc-controls .annotation .stats,' +
                    '#clinical-timelines .wc-controls .annotation #participant {' +
                    '    font-weight: bold;' +
                    '}',
                '#clinical-timelines .wc-controls .back-button button {' +
                    '    padding: 0 5px;' +
                    '    font-size: 14px;' +
                    '}',
                '#clinical-timelines .wc-chart .legend .legend-item {' +
                    'cursor: pointer;' +
                    'border-radius: 4px;' +
                    'padding: 5px;' +
                    'border: 2px solid white;' +
                    '}',
                '#clinical-timelines .wc-chart .legend .legend-item:hover {' +
                    'border: 2px solid black;' +
                    '}',
                '#clinical-timelines .wc-chart .legend .legend-item.selected {' +
                    'background: lightgray;' +
                    '}',
                '#clinical-timelines .wc-chart .wc-svg .y.axis .tick {' +
                    '    cursor: pointer;' +
                    '    fill: blue;' +
                    '    text-decoration: underline;' +
                    '}',
                '#clinical-timelines .wc-chart .wc-svg .visible-reference-line {' +
                    '    stroke: black;' +
                    '    stroke-width: 2px;' +
                    '    stroke-dasharray: 2,2;' +
                    '}',
                '#clinical-timelines .wc-chart .wc-svg .visible-reference-line.hover {' +
                    '    stroke-dasharray: none;' +
                    '}',
                '#clinical-timelines .wc-chart .wc-svg .invisible-reference-line {' +
                    '    stroke: black;' +
                    '    stroke-width: 20px;' +
                    '    stroke-opacity: 0;' +
                    '}',
                '#clinical-timelines .wc-chart .wc-svg .reference-line-label-box {' +
                    '    fill: white;' +
                    '    stroke: black;' +
                    '    stroke-width: black;' +
                    '}',
                '#clinical-timelines .wc-small-multiples .wc-chart {' +
                    '    width: 100%;' +
                    '    padding: 0;' +
                    '    border-top: 1px solid black;' +
                    '}',
                '#clinical-timelines .wc-small-multiples .wc-chart > * {' +
                    '    display: inline-block;' +
                    '}',
                '#clinical-timelines .wc-small-multiples .wc-chart .wc-svg {' +
                    '    float: left;' +
                    '    width: 75%;' +
                    '}',
                '#clinical-timelines .wc-small-multiples .wc-chart .wc-chart-title {' +
                    '    text-align: left;' +
                    '    font-size: 21px;' +
                    '    padding-left: 10px;' +
                    '    width: 24%;' +
                    '}',
                '#clinical-timelines .wc-small-multiples .wc-chart .wc-svg .y.axis .tick {' +
                    '    cursor: default;' +
                    '    fill: black;' +
                    '    text-decoration: none;' +
                    '}',
                '#clinical-timelines .wc-chart.wc-table {' + '    width: 100%;' + '}',
                '#clinical-timelines .wc-chart.wc-table table {' +
                    '    display: table;' +
                    '    width: 100%;' +
                    '}'
            ],
            style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles.join('\n');

        document.getElementsByTagName('head')[0].appendChild(style);
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

    var settings =
        //Renderer-specific settings
        {
            id_col: 'USUBJID',
            event_col: 'DOMAIN',
            seq_col: 'SEQ',
            stdy_col: 'STDY',
            endy_col: 'ENDY',
            eventTypes: null,
            unit: 'participant',
            site_col: 'SITE',
            filters: null,
            details: null,
            referenceLines: null,

            //Standard webcharts settings
            x: {
                type: 'linear',
                column: 'wc_value',
                label: 'Study Day'
            },
            y: {
                type: 'ordinal', // set in syncSettings()
                column: null,
                label: null,
                sort: 'earliest',
                behavior: 'flex'
            },
            marks: [
                {
                    type: 'line',
                    per: null, // set in syncSettings()
                    tooltip: null, // set in syncSettings()
                    attributes: {
                        'stroke-width': 3,
                        'stroke-opacity': 1
                    }
                },
                {
                    type: 'circle',
                    per: null, // set in syncSettings()
                    tooltip: null, // set in syncSettings()
                    radius: '3',
                    attributes: {
                        'fill-opacity': 1,
                        'stroke-opacity': 1
                    }
                }
            ],
            color_dom: null, // set in syncSettings()
            legend: {
                location: 'top',
                label: '',
                mark: 'circle',
                order: null
            }, // set in syncSettings()
            gridlines: 'y',
            range_band: 24,
            margin: { top: 50 }, // for second x-axis
            resizable: false
        };

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

    function syncSettings(settings) {
        var syncedSettings = clone(settings);

        if (!(syncedSettings.eventTypes instanceof Array && syncedSettings.eventTypes.length))
            delete syncedSettings.eventTypes;
        syncedSettings.y.column = syncedSettings.id_col;

        //Lines (events with duration)
        syncedSettings.marks[0].per = [
            syncedSettings.id_col,
            syncedSettings.event_col,
            syncedSettings.seq_col
        ];
        syncedSettings.marks[0].tooltip =
            'Event: [' +
            syncedSettings.event_col +
            ']' +
            ('\nStart Day: [' + syncedSettings.stdy_col + ']') +
            ('\nStop Day: [' + syncedSettings.endy_col + ']');

        //Circles (events without duration)
        syncedSettings.marks[1].per = [
            syncedSettings.id_col,
            syncedSettings.event_col,
            syncedSettings.seq_col,
            'wc_value'
        ];
        syncedSettings.marks[1].tooltip =
            'Event: [' +
            syncedSettings.event_col +
            ']' +
            ('\nStart Day: [' + syncedSettings.stdy_col + ']') +
            ('\nStop Day: [' + syncedSettings.endy_col + ']');
        syncedSettings.marks[1].values = { wc_category: [syncedSettings.stdy_col] };

        //Define mark coloring and legend order.
        syncedSettings.color_by = syncedSettings.event_col;

        //Default filters
        var defaultFilters = [
            {
                type: 'subsetter',
                value_col: syncedSettings.id_col,
                label: 'Participant',
                multiple: false
            },
            {
                type: 'subsetter',
                value_col: syncedSettings.event_col,
                label: 'Event Type',
                multiple: true,
                start: syncedSettings.eventTypes
            },
            {
                type: 'subsetter',
                value_col: syncedSettings.site_col,
                label: 'Site',
                multiple: false
            }
        ];
        syncedSettings.filters =
            syncedSettings.filters instanceof Array && syncedSettings.filters.length
                ? defaultFilters.concat(
                      syncedSettings.filters
                          .filter(function(filter) {
                              return (
                                  filter instanceof String ||
                                  (filter instanceof Object && filter.hasOwnProperty('value_col'))
                              );
                          })
                          .map(function(filter) {
                              var filterObject = {};
                              filterObject.type = 'subsetter';
                              filterObject.value_col = filter.value_col || filter;
                              filterObject.label = filter.label || filter.value_col;
                              filterObject.multiple = filterObject.multiple === true ? true : false;
                              return filterObject;
                          })
                  )
                : defaultFilters;

        //Default details
        var defaultDetails = [
            { value_col: syncedSettings.event_col, label: 'Event Type' },
            { value_col: syncedSettings.seq_col, label: 'Sequence Number' },
            { value_col: syncedSettings.stdy_col, label: 'Start Day' },
            { value_col: syncedSettings.endy_col, label: 'Stop Day' }
        ];
        syncedSettings.details =
            syncedSettings.details instanceof Array && syncedSettings.details.length
                ? defaultDetails.concat(
                      syncedSettings.details
                          .filter(function(detail) {
                              return (
                                  detail instanceof String ||
                                  (detail instanceof Object && detail.hasOwnProperty('value_col'))
                              );
                          })
                          .map(function(detail) {
                              var detailObject = {};
                              detailObject.value_col = detail.value_col || detail;
                              detailObject.label = detail.label || detail.value_col;
                              return detailObject;
                          })
                  )
                : defaultDetails;

        //Add settings.filters columns to default details.
        syncedSettings.filters.forEach(function(filter) {
            if (
                syncedSettings.details
                    .map(function(detail) {
                        return detail.value_col;
                    })
                    .indexOf(filter.value_col) === -1
            )
                syncedSettings.details.push(filter);
        });

        //Participant timelines settings
        syncedSettings.participantSettings = clone(syncedSettings);
        syncedSettings.participantSettings.x.label = '';
        syncedSettings.participantSettings.y.column = syncedSettings.participantSettings.seq_col;
        syncedSettings.participantSettings.y.sort = 'alphabetical-descending';
        syncedSettings.participantSettings.marks[0].per = [
            syncedSettings.participantSettings.event_col,
            syncedSettings.participantSettings.seq_col
        ];
        syncedSettings.participantSettings.marks[1].per = [
            syncedSettings.participantSettings.event_col,
            syncedSettings.participantSettings.seq_col,
            'wc_value'
        ];
        syncedSettings.participantSettings.range_band = syncedSettings.range_band / 2;
        syncedSettings.participantSettings.margin = { left: 25 };

        //Handle potential referenceLines inputs.
        if (!(syncedSettings.referenceLines instanceof Array))
            syncedSettings.referenceLines = [syncedSettings.referenceLines];

        syncedSettings.referenceLines = syncedSettings.referenceLines
            .map(function(referenceLine) {
                var referenceLineObject = {};
                referenceLineObject.studyDay = referenceLine.studyDay || referenceLine;
                referenceLineObject.label =
                    referenceLine.label || 'Study Day ' + referenceLineObject.studyDay;

                return referenceLineObject;
            })
            .filter(function(referenceLine) {
                return Number.isInteger(referenceLine.studyDay);
            });

        if (!syncedSettings.referenceLines.length) delete syncedSettings.referenceLines;

        return syncedSettings;
    }

    var controls = [
        {
            type: 'radio',
            option: 'y.sort',
            label: 'Sort participants',
            values: ['earliest', 'alphabetical-descending'],
            relabels: ['by earliest event', 'alphanumerically']
        }
    ];

    function syncControls(controls, settings) {
        settings.filters.reverse().forEach(function(filter) {
            controls.unshift(filter);
        });

        return controls;
    }

    var defaults = {
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

    function onInit() {
        var _this = this;

        this.wide_data = this.raw_data.filter(
            function(d) {
                return (
                    /^\d+$/.test(d[_this.config.stdy_col]) && // keep only records with start days
                    !/^\s*$/.test(d[_this.config.id_col]) && // remove records with missing [id_col]
                    !/^\s*$/.test(d[_this.config.event_col])
                );
            } // remove records with missing [event_col]
        );

        //Calculate number of total participants and number of participants with any event.
        this.populationDetails = {
            population: d3$1
                .set(
                    this.raw_data.map(function(d) {
                        return d[_this.config.id_col];
                    })
                )
                .values()
        };
        this.populationDetails.N = this.populationDetails.population.length;
        this.participantDetails = {};

        //Define a record for each start day and stop day.
        this.raw_data = lengthenRaw(this.wide_data, [this.config.stdy_col, this.config.endy_col]);
        this.raw_data.forEach(function(d) {
            d.wc_value = d.wc_value ? +d.wc_value : NaN;
        });

        //Remove filters for variables fewer than two levels.
        this.controls.config.inputs = this.controls.config.inputs.filter(function(filter) {
            if (filter.type !== 'subsetter') return true;
            else {
                var levels = d3$1
                    .set(
                        _this.raw_data.map(function(d) {
                            return d[filter.value_col];
                        })
                    )
                    .values();

                if (levels.length < 2) {
                    console.warn(
                        filter.value_col +
                            ' filter removed because the variable has only one level.'
                    );
                }

                return levels.length > 1;
            }
        });

        //Default event types to 'All'.
        this.allEventTypes = d3$1
            .set(
                this.raw_data.map(function(d) {
                    return d[_this.config.event_col];
                })
            )
            .values()
            .sort();
        this.currentEventTypes = this.config.eventTypes || this.allEventTypes;
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

    function backButton() {
        var _this = this;

        delete this.selected_id;

        //Enable/Disable controls other than Participant and Event Type filters.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(control) {
                return ['Participant', 'Event Type'].indexOf(control.label) === -1;
            })
            .selectAll('select,input')
            .property('disabled', false);

        //Update participant filter.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(control) {
                return control.value_col === _this.config.id_col;
            })
            .selectAll('option')
            .property('selected', function(option) {
                return option === 'All';
            });
        this.filters.filter(function(filter) {
            return filter.col === _this.config.id_col;
        })[0].val =
            'All';

        //Hide participant timelines.
        this.participantDetails.wrap.classed('hidden', true);
        this.participantTimeline.wrap.classed('hidden', true);
        this.listing.wrap.classed('hidden', true);
        this.backButton.classed('hidden', true);

        //Display population timelines.
        this.populationDetails.wrap.classed('hidden', false);
        this.wrap.classed('hidden', false);

        //Redraw clinical timelines.
        this.draw();

        //Highlight participant dropdown.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(control) {
                return control.label === 'Participant';
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

    function drawParticipantTimeline() {
        var _this = this;

        this.selected_id = this.filters.filter(function(filter) {
            return filter.col === _this.config.id_col;
        })[0].val;

        if (this.selected_id !== 'All') {
            //Hide population details.
            this.populationDetails.wrap.classed('hidden', true);

            //Display participant information.
            this.participantDetails.wrap.classed('hidden', false);
            this.participantDetails.wrap.select('#participant').text(this.selected_id);

            //Display back button.
            this.backButton.classed('hidden', false);

            //Hide clinical timelines.
            this.wrap.classed('hidden', true);

            //Define participant data.
            var longParticipantData = this.raw_data.filter(function(di) {
                    return (
                        di[_this.config.id_col] === _this.selected_id &&
                        (_this.currentEventTypes !== 'All'
                            ? _this.currentEventTypes.indexOf(di[_this.config.event_col]) > -1
                            : true)
                    );
                }),
                wideParticipantData = this.wide_data.filter(function(di) {
                    return (
                        di[_this.config.id_col] === _this.selected_id &&
                        (_this.currentEventTypes !== 'All'
                            ? _this.currentEventTypes.indexOf(di[_this.config.event_col]) > -1
                            : true)
                    );
                });

            //Draw participant timeline.
            this.participantTimeline.wrap.classed('hidden', false);
            this.participantTimeline.wrap.selectAll('*').remove();
            webcharts.multiply(
                this.participantTimeline,
                longParticipantData,
                this.config.event_col
            );

            //Draw participant detail listing.
            this.listing.wrap.classed('hidden', false);
            this.listing.draw(wideParticipantData);
        } else {
            delete this.selected_id;

            //Display population details.
            this.populationDetails.wrap.classed('hidden', false);

            //Hide participant information.
            this.participantDetails.wrap.classed('hidden', true);
            this.participantDetails.wrap.select('#participant').text('');

            //Display back button.
            this.backButton.classed('hidden', true);

            //Hide clinical timelines.
            this.wrap.classed('hidden', false);
            this.draw();

            //Hide participant timeline.
            this.participantTimeline.wrap.selectAll('*').remove();
            this.participantTimeline.wrap.classed('hidden', true);

            //Draw participant detail listing.
            this.listing.draw([]);
            this.listing.wrap.classed('hidden', true);
        }

        //Enable/Disable controls other than Participant and Event Type filters.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(control) {
                return ['Participant', 'Event Type'].indexOf(control.label) === -1;
            })
            .selectAll('select,input')
            .property('disabled', !!this.selected_id);
    }

    function onLayout() {
        var _this = this;

        var context = this;

        //Add div for population stats.
        this.populationDetails.wrap = this.controls.wrap
            .append('div')
            .classed('annotation population-details', true);

        //Add div for back button and participant ID title.
        this.participantDetails.wrap = this.controls.wrap
            .append('div')
            .classed('annotation participant-details hidden', true)
            .html('Viewing ' + this.config.unit + " <span id = 'participant'></span>");

        //Add div for back button and participant ID title.
        this.backButton = this.controls.wrap.append('div').classed('back-button hidden', true);
        this.backButton
            .append('button')
            .html('&#8592; Back')
            .on('click', function() {
                backButton.call(_this);
            });

        //Add top x-axis.
        var topXaxis = this.svg.append('g').classed('x-top axis linear', true);
        topXaxis
            .append('text')
            .classed('axis-title top', true)
            .text('Study Day');

        //Hide multiples that are currently unselected.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(d) {
                return d.type === 'subsetter';
            })
            .each(function(filter) {
                if (filter.label === 'Event Type')
                    d3$1
                        .select(this)
                        .selectAll('option')
                        .property('selected', function(d) {
                            return context.currentEventTypes instanceof Array
                                ? context.currentEventTypes.indexOf(d) > -1
                                : true;
                        });
            })
            .on('change', function(filter) {
                if (filter.value_col === _this.config.id_col) {
                    drawParticipantTimeline.call(_this);
                } else if (filter.value_col === _this.config.event_col) {
                    _this.currentEventTypes = _this.filters.filter(function(filter) {
                        return filter.col === _this.config.event_col;
                    })[0].val;
                    if (_this.selected_id) drawParticipantTimeline.call(_this);
                } else {
                    console.log('handle custom filters here');
                }
            });
    }

    function onPreprocess() {}

    function onDatatransform() {
        var _this = this;

        this.populationDetails.sample = d3$1
            .set(
                this.filtered_data.map(function(d) {
                    return d[_this.config.id_col];
                })
            )
            .values();
        this.populationDetails.n = this.populationDetails.sample.length;
        this.populationDetails.rate = this.populationDetails.n / this.populationDetails.N;
        this.populationDetails.wrap.html(
            "<span class = 'stats'>" +
                this.populationDetails.n +
                "</span> of <span class = 'stats'>" +
                this.populationDetails.N +
                '</span> ' +
                this.config.unit +
                "(s) displayed (<span class = 'stats'>" +
                d3$1.format('%')(this.populationDetails.rate) +
                '</span>)'
        );
    }

    function onDraw() {
        var _this = this;

        if (this.config.y.sort === 'earliest') {
            //Redefine filtered data as it defaults to the final mark drawn, which might be filtered in
            //addition to the current filter selections.
            var filtered_data = this.raw_data.filter(function(d) {
                var filtered = d[_this.config.seq_col] === '';

                _this.filters.forEach(function(di) {
                    if (filtered === false && di.val !== 'All')
                        filtered =
                            Object.prototype.toString.call(di.val) === '[object Array]'
                                ? di.val.indexOf(d[di.col]) === -1
                                : di.val !== d[di.col];
                });

                return !filtered;
            });

            //Capture all subject IDs with adverse events with a start day.
            var withStartDay = d3$1
                .nest()
                .key(function(d) {
                    return d[_this.config.id_col];
                })
                .rollup(function(d) {
                    return d3$1.min(d, function(di) {
                        return +di[_this.config.stdy_col];
                    });
                })
                .entries(
                    filtered_data.filter(function(d) {
                        return (
                            !isNaN(parseFloat(d[_this.config.stdy_col])) &&
                            isFinite(d[_this.config.stdy_col])
                        );
                    })
                )
                .sort(function(a, b) {
                    return a.values > b.values
                        ? -2
                        : a.values < b.values ? 2 : a.key > b.key ? -1 : 1;
                })
                .map(function(d) {
                    return d.key;
                });

            //Capture all subject IDs with adverse events without a start day.
            var withoutStartDay = d3$1
                .set(
                    filtered_data
                        .filter(function(d) {
                            return (
                                +d[_this.config.seq_col] > 0 &&
                                (isNaN(parseFloat(d[_this.config.stdy_col])) ||
                                    !isFinite(d[_this.config.stdy_col])) &&
                                withStartDay.indexOf(d[_this.config.id_col]) === -1
                            );
                        })
                        .map(function(d) {
                            return d[_this.config.id_col];
                        })
                )
                .values();
            this.y_dom = withStartDay.concat(withoutStartDay);
        } else this.y_dom = this.y_dom.sort(d3$1.descending);
    }

    function legendFilter() {
        var _this = this;

        //Filter data by clicking on legend.
        var context = this,
            eventTypeFilter = this.filters.filter(function(filter) {
                return filter.col === _this.config.event_col;
            })[0],
            eventTypeControl = this.controls.wrap.selectAll('.control-group').filter(function(d) {
                return d.label === 'Event Type';
            }),
            eventTypes = eventTypeControl.selectAll('.changer option').sort(function(a, b) {
                return _this.config.color_dom.indexOf(a) - _this.config.color_dom.indexOf(b);
            }),
            // event type options
            legendItems = this.wrap.selectAll('.legend-item').classed('selected', function(d) {
                return eventTypeFilter.val instanceof Array
                    ? eventTypeFilter.val.indexOf(d.label) > -1
                    : true;
            });

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

            context.filters.filter(function(filter) {
                return filter.col === context.config.event_col;
            })[0].val = selectedLegendItems; // update filter object
            context.draw();
        });
    }

    function drawParticipantTimeline$1() {
        var _this = this;

        //Update participant filter.
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
        })[0].val = this.selected_id;

        //Hide population details.
        this.populationDetails.wrap.classed('hidden', true);

        //Display participant information.
        this.participantDetails.wrap.classed('hidden', false);
        this.participantDetails.wrap.select('#participant').text(this.selected_id);

        //Display back button.
        this.backButton.classed('hidden', false);

        //Hide clinical timelines.
        this.wrap.classed('hidden', true);

        //Define participant data.
        var longParticipantData = this.raw_data.filter(function(di) {
                return (
                    di[_this.config.id_col] === _this.selected_id &&
                    (_this.currentEventTypes !== 'All'
                        ? _this.currentEventTypes.indexOf(di[_this.config.event_col]) > -1
                        : true)
                );
            }),
            wideParticipantData = this.wide_data.filter(function(di) {
                return (
                    di[_this.config.id_col] === _this.selected_id &&
                    (_this.currentEventTypes !== 'All'
                        ? _this.currentEventTypes.indexOf(di[_this.config.event_col]) > -1
                        : true)
                );
            });

        //Draw participant timeline.
        this.participantTimeline.wrap.classed('hidden', false);
        this.participantTimeline.wrap.selectAll('*').remove();
        webcharts.multiply(this.participantTimeline, longParticipantData, this.config.event_col);

        //Draw participant detail listing.
        this.listing.wrap.classed('hidden', false);
        this.listing.draw(wideParticipantData);

        //Enable/Disable controls other than Participant and Event Type filters.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(control) {
                return ['Participant', 'Event Type'].indexOf(control.label) === -1;
            })
            .selectAll('select,input')
            .property('disabled', !!this.selected_id);

        //Highlight participant dropdown.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(control) {
                return control.label === 'Participant';
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
        var participantData = d3$1
            .nest()
            .key(function(d) {
                return d.values[0].values.raw[0][_this.config.id_col];
            })
            .key(function(d) {
                return d.key;
            })
            .rollup(function(d) {
                //Expose start and end point of line.
                return {
                    x1: +d[0].values[0].key,
                    x2: +d[0].values[1].key
                };
            })
            .entries(
                markData.filter(function(d) {
                    return d.values.length > 1;
                })
            );

        //For each participant...
        participantData.forEach(function(participantDatum) {
            var lineData = participantDatum.values;

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
                                d3$1.max(currentlyOverlappingLines, function(d) {
                                    return d.offset;
                                }) + 1;
                            currentlyOverlappingLines.push(currentLine);
                        } else {
                            //otherwise replace non-overlapping line with the smallest offset with current line
                            currentlyOverlappingLines.forEach(function(d, i) {
                                d.index = i;
                            });
                            var minOffset = d3$1.min(
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
                            g = d3$1.select(document.getElementsByClassName(className)[0]),
                            line = g.select('path');
                        g.attr(
                            'transform',
                            'translate(0,' +
                                currentLine.offset * +mark.attributes['stroke-width'] * 2 +
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
        var overlapping = d3$1
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
                y = d.key.split('|')[1]; // participant

            //For each overlapping point...
            d.values.keys.forEach(function(di, i) {
                //Capture point via its class name and offset vertically.
                var className = di + ' point',
                    g = d3$1.select(document.getElementsByClassName(className)[0]),
                    point = g.select('circle');
                g.attr('transform', 'translate(0,' + i * +mark.radius * 2 + ')');
            });
        });
    }

    function drawReferenceLines() {
        var _this = this;

        this.svg.select('.reference-lines').remove();
        var referenceLinesGroup = this.svg
            .insert('g', '#clinical-timelines .wc-chart .wc-svg .line-supergroup')
            .classed('reference-lines', true);

        //Append reference line for each item in config.referenceLines.
        this.config.referenceLines.forEach(function(studyDay, i) {
            var referenceLineGroup = referenceLinesGroup
                    .append('g')
                    .classed('reference-line', true)
                    .attr('id', 'reference-line-' + i),
                visibleReferenceLine = referenceLineGroup
                    .append('line')
                    .classed('visible-reference-line', true)
                    .attr({
                        x1: _this.x(studyDay.studyDay),
                        x2: _this.x(studyDay.studyDay),
                        y1: 0,
                        y2: _this.plot_height
                    }),
                invisibleReferenceLine = referenceLineGroup
                    .append('line')
                    .classed('invisible-reference-line', true)
                    .attr({
                        x1: _this.x(studyDay.studyDay),
                        x2: _this.x(studyDay.studyDay),
                        y1: 0,
                        y2: _this.plot_height
                    }),
                // invisible reference line has no dasharray and is much thicker to make hovering easier
                direction =
                    studyDay.studyDay <= (_this.x_dom[1] - _this.x_dom[0]) / 2 ? 'right' : 'left',
                referenceLineLabel = referenceLineGroup
                    .append('text')
                    .classed('reference-line-label', true)
                    .attr({
                        x: _this.x(studyDay.studyDay),
                        y: 0,
                        'text-anchor': direction === 'right' ? 'beginning' : 'end',
                        dx: direction === 'right' ? 15 : -15,
                        dy: _this.config.range_band * (_this.parent ? 1.5 : 1)
                    })
                    .text(studyDay.label),
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
        var topXaxis = d3$1.svg
                .axis()
                .scale(this.x)
                .orient('top')
                .tickFormat(this.xAxis.tickFormat())
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
                    this.config.margin.top / 2 +
                    ')'
            );

        //Draw second chart when y-axis tick label is clicked.
        this.svg.selectAll('.y.axis .tick').on('click', function(d) {
            _this.selected_id = d;
            drawParticipantTimeline$1.call(_this);
        });

        //Offset overlapping marks.
        this.config.marks.forEach(function(mark, i) {
            var markData = _this.marks[i].data;
            if (mark.type === 'line') {
                offsetLines.call(_this, mark, markData);
            } else if (mark.type === 'circle') {
                offsetCircles.call(_this, mark, markData);
            }
        });

        //Draw reference lines.
        if (this.config.referenceLines) drawReferenceLines.call(this);
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

    function onPreprocess$1() {
        this.config.x.domain = this.parent.clinicalTimelines.x_dom;
    }

    function onDatatransform$1() {}

    function onDraw$1() {
        var wrapWidth = +this.wrap.style('width').replace(/[^\d.]/g, ''),
            newWidth = wrapWidth * 0.75;
        this.raw_width = newWidth;
    }

    function onResize$1() {
        this.wrap.select('.legend').classed('hidden', true);

        //Draw reference lines.
        if (this.config.referenceLines) drawReferenceLines.call(this);
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

    function participantTimeline(clinicalTimelines) {
        var participantTimeline = webcharts.createChart(
            clinicalTimelines.element,
            clinicalTimelines.config.participantSettings
        );

        for (var callback in callbacks$1) {
            participantTimeline.on(callback.substring(2).toLowerCase(), callbacks$1[callback]);
        }
        participantTimeline.clinicalTimelines = clinicalTimelines;
        participantTimeline.wrap.classed('hidden', true);

        return participantTimeline;
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
        var listing = webcharts.createTable(clinicalTimelines.element, {
            cols: clinicalTimelines.config.details.map(function(d) {
                return d.value_col;
            }),
            headers: clinicalTimelines.config.details.map(function(d) {
                return d.label;
            })
        });

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
        var container = d3$1
                .select(element)
                .append('div')
                .attr('id', 'clinical-timelines'),
            containerElement = container.node();

        //Define .css styles to avoid requiring a separate .css file.
        defineStyles();

        var mergedSettings = Object.assign({}, defaults.settings, settings),
            syncedSettings = defaults.syncSettings(mergedSettings),
            syncedControls = defaults.syncControls(defaults.controls, syncedSettings),
            controls = webcharts.createControls(containerElement, {
                location: 'top',
                inputs: syncedControls
            }),
            clinicalTimelines = webcharts.createChart(containerElement, syncedSettings, controls);

        for (var callback in callbacks) {
            clinicalTimelines.on(callback.substring(2).toLowerCase(), callbacks[callback]);
        }
        clinicalTimelines.element = containerElement;
        clinicalTimelines.participantTimeline = participantTimeline(clinicalTimelines);
        clinicalTimelines.listing = listing(clinicalTimelines);

        return clinicalTimelines;
    }

    return clinicalTimelines;
});
