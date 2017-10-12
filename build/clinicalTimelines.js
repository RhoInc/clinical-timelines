(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3'), require('webcharts')) :
	typeof define === 'function' && define.amd ? define(['d3', 'webcharts'], factory) :
	(global.clinicalTimelines = factory(global.d3,global.webCharts));
}(this, (function (d3,webcharts) { 'use strict';

function defineStyles() {
    var styles = ['#clinical-timelines .hidden {' + '    display: none !important;' + '}', '#clinical-timelines .wc-controls {' + '    border: 1px solid #eee;' + '    padding: 5px;' + '}', '#clinical-timelines .wc-controls .population-details {' + '    float: right;' + '}', '#clinical-timelines .wc-controls .population-details .stats {' + '    font-weight: bold;' + '}', '#clinical-timelines .wc-controls .participant-details {' + '    display: block;' + '}', '#clinical-timelines .wc-controls .participant-details > * {' + '    display: inline-block;' + '    font-size: 16px;' + '}', '#clinical-timelines .wc-controls .participant-details .back-button button {' + '    padding: 0 5px;' + '    font-size: 14px;' + '}', '#clinical-timelines .wc-controls .participant-details #participant {' + '    font-weight: bold;' + '}', '#clinical-timelines .wc-controls .participant-details .back-button {' + '    margin-right: 10px;' + '}', '#clinical-timelines .wc-chart .wc-svg .y.axis .tick {' + '    cursor: pointer;' + '    fill: blue;' + '    text-decoration: underline;' + '}', '#clinical-timelines .wc-small-multiples .wc-chart {' + '    width: 100%;' + '    padding: 0;' + '}', '#clinical-timelines .wc-small-multiples .wc-chart .wc-chart-title {' + '    text-align: left;' + '    font-size: 21px;' + '    padding-bottom: 5px;' + '}', '#clinical-timelines .wc-small-multiples .wc-chart .wc-svg .y.axis .tick {' + '    cursor: default;' + '    fill: black;' + '    text-decoration: none;' + '}'],
        style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');

    document.getElementsByTagName('head')[0].appendChild(style);
}

/*------------------------------------------------------------------------------------------------\
  Add assign method to Object if nonexistent.
\------------------------------------------------------------------------------------------------*/

if (typeof Object.assign != 'function') {
    (function () {
        Object.assign = function (target) {
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

var settings = //Renderer-specific settings
{ id_col: 'USUBJID',
    event_col: 'DOMAIN',
    seq_col: 'SEQ',
    stdy_col: 'STDY',
    endy_col: 'ENDY',
    events: null,
    unit: 'participant',
    filters: null,
    details: null

    //Standard webcharts settings
    , x: { type: 'linear',
        column: 'wc_value',
        label: null },
    y: { type: 'ordinal' // set in syncSettings()
        , column: null,
        label: null,
        sort: 'earliest',
        behavior: 'flex' },
    marks: [{ type: 'line',
        per: null // set in syncSettings()
        , tooltip: null // set in syncSettings()
        , attributes: { 'stroke-width': 5,
            'stroke-opacity': .5 } }, { type: 'circle',
        per: null // set in syncSettings()
        , tooltip: null // set in syncSettings()
        , attributes: { 'fill-opacity': .5,
            'stroke-opacity': .5 } }],
    color_dom: null // set in syncSettings()
    , legend: { location: 'top',
        label: '',
        mark: 'circle',
        order: null // set in syncSettings()
    }, gridlines: 'y',
    range_band: 15,
    margin: { top: 50 // for second x-axis
    }, resizable: true
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
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
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
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

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

/*------------------------------------------------------------------------------------------------\
  Clone a variable (http://stackoverflow.com/a/728694).
\------------------------------------------------------------------------------------------------*/

function clone(obj) {
    var copy;

    //Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' != (typeof obj === "undefined" ? "undefined" : _typeof(obj))) return obj;

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

    syncedSettings.y.column = syncedSettings.id_col;

    //Lines (events with duration)
    syncedSettings.marks[0].per = [syncedSettings.id_col, syncedSettings.event_col, syncedSettings.seq_col];
    syncedSettings.marks[0].tooltip = 'Event: [' + syncedSettings.event_col + ']' + ('\nStart Day: [' + syncedSettings.stdy_col + ']') + ('\nStop Day: [' + syncedSettings.endy_col + ']');

    //Circles (events without duration)
    syncedSettings.marks[1].per = [syncedSettings.id_col, syncedSettings.event_col, syncedSettings.seq_col, 'wc_value'];
    syncedSettings.marks[1].tooltip = 'Event: [' + syncedSettings.event_col + ']' + ('\nStart Day: [' + syncedSettings.stdy_col + ']') + ('\nStop Day: [' + syncedSettings.endy_col + ']');
    syncedSettings.marks[1].values = { wc_category: [syncedSettings.stdy_col] };

    //Define mark coloring and legend order.
    syncedSettings.color_by = syncedSettings.event_col;
    syncedSettings.color_dom = syncedSettings.events;
    syncedSettings.legend.order = syncedSettings.color_dom;

    //Default filters
    var defaultFilters = [{ type: 'subsetter', value_col: syncedSettings.id_col, label: 'Participant', multiple: true }, { type: 'subsetter', value_col: syncedSettings.event_col, label: 'Event Type', multiple: true }];
    syncedSettings.filters = syncedSettings.filters instanceof Array && syncedSettings.filters.length ? defaultFilters.concat(syncedSettings.filters.filter(function (filter) {
        return filter instanceof String || filter instanceof Object && filter.hasOwnProperty('value_col');
    }).map(function (filter) {
        var filterObject = {};
        filterObject.type = 'subsetter';
        filterObject.value_col = filter.value_col || filter;
        filterObject.label = filter.label || filter.value_col;
        filterObject.multiple = filterObject.multiple === true ? true : false;
        return filterObject;
    })) : defaultFilters;

    //Default details
    var defaultDetails = [{ value_col: syncedSettings.event_col, label: 'Event Type' }, { value_col: syncedSettings.seq_col, label: 'Sequence Number' }, { value_col: syncedSettings.stdy_col, label: 'Start Day' }, { value_col: syncedSettings.endy_col, label: 'Stop Day' }];
    syncedSettings.details = syncedSettings.details instanceof Array && syncedSettings.details.length ? defaultDetails.concat(syncedSettings.details.filter(function (detail) {
        return detail instanceof String || detail instanceof Object && detail.hasOwnProperty('value_col');
    }).map(function (detail) {
        var detailObject = {};
        detailObject.value_col = detail.value_col || detail;
        detailObject.label = detail.label || detail.value_col;
        return detailObject;
    })) : defaultDetails;

    //Add settings.filters columns to default details.
    syncedSettings.filters.forEach(function (filter) {
        if (syncedSettings.details.map(function (detail) {
            return detail.value_col;
        }).indexOf(filter.value_col) === -1) syncedSettings.details.push(filter);
    });

    //Participant timelines settings
    syncedSettings.participantSettings = clone(syncedSettings);
    syncedSettings.participantSettings.y.column = syncedSettings.participantSettings.seq_col;
    syncedSettings.participantSettings.y.sort = 'alphabetical-descending';
    syncedSettings.participantSettings.marks[0].per = [syncedSettings.participantSettings.event_col, syncedSettings.participantSettings.seq_col];
    syncedSettings.participantSettings.marks[1].per = [syncedSettings.participantSettings.event_col, syncedSettings.participantSettings.seq_col, 'wc_value'];
    syncedSettings.participantSettings.margin = null;
    syncedSettings.participantSettings.transitions = false;

    return syncedSettings;
}

var controls = [{ type: 'radio',
    option: 'y.sort',
    label: 'Sort participants',
    values: ['earliest', 'alphabetical-descending'],
    relabels: ['by earliest event', 'alphanumerically']
}];

function syncControls(controls, settings) {
    settings.filters.reverse().forEach(function (filter) {
        console.log(filter);
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

    data.forEach(function (d) {
        columns.forEach(function (column) {
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

    this.wide_data = this.raw_data.filter(function (d) {
        return (/^\d+$/.test(d[_this.config.stdy_col]) && // keep only records with start days
            !/^\s*$/.test(d[_this.config.id_col]) && // remove records with missing [id_col]
            !/^\s*$/.test(d[_this.config.event_col])
        );
    } // remove records with missing [event_col]
    );

    //Calculate number of total participants and number of participants with any event.
    this.populationDetails = {
        population: d3.set(this.raw_data.map(function (d) {
            return d[_this.config.id_col];
        })).values()
    };
    this.populationDetails.N = this.populationDetails.population.length;
    this.participantDetails = {};

    //Define a record for each start day and stop day.
    this.raw_data = lengthenRaw(this.wide_data, [this.config.stdy_col, this.config.endy_col]);
    this.raw_data.forEach(function (d) {
        d.wc_value = d.wc_value ? +d.wc_value : NaN;
    });

    //Remove filters for variables fewer than two levels.
    this.controls.config.inputs = this.controls.config.inputs.filter(function (filter) {
        return filter.type === 'subsetter';
    }).filter(function (filter) {
        var levels = d3.set(_this.raw_data.map(function (d) {
            return d[filter.value_col];
        })).values();

        if (levels.length < 2) {
            console.warn(filter.value_col + ' filter removed because the variable has only one level.');
        }

        return levels.length > 1;
    });
}

function onLayout() {
    var _this = this;

    this.populationDetails.wrap = this.controls.wrap.append('div').classed('population-details', true);

    //Add div for back button and participant ID title.
    this.participantDetails.wrap = this.controls.wrap.append('div').classed('participant-details', true).html('Viewing ' + this.config.unit + ' <span id = \'participant\'></span>');

    //Add div for back button and participant ID title.
    this.controls.wrap.append('div').classed('back-button hidden', true).append('button').html('&#8592; Back').on('click', function () {
        _this.controls.wrap.selectAll('.control-group select').property('disabled', false);
        _this.participantDetails.wrap.classed('hidden', true);
        _this.populationDetails.wrap.classed('hidden', false);
        _this.participantTimeline.wrap.classed('hidden', true);
        _this.listing.wrap.classed('hidden', true);
        _this.populationDetails.annotation.classed('hidden', false);
        _this.wrap.classed('hidden', false);
        _this.participantDetails.wrap.classed('hidden', true);
    });

    //Add top x-axis.
    var topXaxis = this.svg.append('g').classed('x-top axis linear', true);
    topXaxis.append('text').classed('axis-title top', true).text(this.config.x_label);
}

function onPreprocess() {
    
}

function onDatatransform() {
    var _this = this;

    this.populationDetails.sample = d3.set(this.filtered_data.map(function (d) {
        return d[_this.config.id_col];
    })).values();
    this.populationDetails.n = this.populationDetails.sample.length;
    this.populationDetails.rate = this.populationDetails.n / this.populationDetails.N;
    this.populationDetails.annotation.text(this.populationDetails.n + ' of ' + this.populationDetails.N + ' ' + this.config.unit + '(s) displayed (' + d3.format('%')(this.populationDetails.rate) + ')');
}

function onDraw() {
    var _this = this;

    if (this.config.y.sort === 'earliest') {
        //Redefine filtered data as it defaults to the final mark drawn, which might be filtered in
        //addition to the current filter selections.
        var filtered_data = this.raw_data.filter(function (d) {
            var filtered = d[_this.config.seq_col] === '';

            _this.filters.forEach(function (di) {
                if (filtered === false && di.val !== 'All') filtered = Object.prototype.toString.call(di.val) === '[object Array]' ? di.val.indexOf(d[di.col]) === -1 : di.val !== d[di.col];
            });

            return !filtered;
        });

        //Capture all subject IDs with adverse events with a start day.
        var withStartDay = d3.nest().key(function (d) {
            return d[_this.config.id_col];
        }).rollup(function (d) {
            return d3.min(d, function (di) {
                return +di[_this.config.stdy_col];
            });
        }).entries(filtered_data.filter(function (d) {
            return !isNaN(parseFloat(d[_this.config.stdy_col])) && isFinite(d[_this.config.stdy_col]);
        })).sort(function (a, b) {
            return a.values > b.values ? -2 : a.values < b.values ? 2 : a.key > b.key ? -1 : 1;
        }).map(function (d) {
            return d.key;
        });

        //Capture all subject IDs with adverse events without a start day.
        var withoutStartDay = d3.set(filtered_data.filter(function (d) {
            return +d[_this.config.seq_col] > 0 && (isNaN(parseFloat(d[_this.config.stdy_col])) || !isFinite(d[_this.config.stdy_col])) && withStartDay.indexOf(d[_this.config.id_col]) === -1;
        }).map(function (d) {
            return d[_this.config.id_col];
        })).values();
        this.y_dom = withStartDay.concat(withoutStartDay);
    } else this.y_dom = this.y_dom.sort(d3.descending);
}

function onResize() {
    var _this = this;

    var topXaxis = d3.svg.axis().scale(this.x).orient('top').tickFormat(this.xAxis.tickFormat()).innerTickSize(this.xAxis.innerTickSize()).outerTickSize(this.xAxis.outerTickSize()).ticks(this.xAxis.ticks()[0]),
        topXaxisSelection = this.svg.select('g.x2.axis').attr('class', 'x2 axis linear');
    topXaxisSelection.call(topXaxis);
    topXaxisSelection.select('text.axis-title.top').attr('transform', 'translate(' + this.raw_width / 2 + ',-' + this.config.margin.top + ')');

    //Draw second chart when y-axis tick label is clicked.
    this.svg.selectAll('.y.axis .tick').on('click', function (d) {
        //Disable controls.
        _this.controls.wrap.selectAll('.control-group select').property('disabled', function (d) {
            return d.value_col === _this.config.id_col;
        });

        //Hide population details.
        _this.populationDetails.annotation.classed('hidden', true);

        //Display back button and participant information.
        _this.participantDetails.annotation.classed('hidden', false);
        _this.participantDetails.annotation.select('#participant').text(d);

        //Display back button and participant information.
        _this.participantDetails.wrap.classed('hidden', false);
        _this.participantDetails.annotation.select('#participant').text(d);

        //Hide clinical timelines.
        _this.wrap.classed('hidden', true);

        //Define participant data.
        var longParticipantData = _this.raw_data.filter(function (di) {
            return di[_this.config.id_col] === d;
        }),
            wideParticipantData = _this.wide_data.filter(function (di) {
            return di[_this.config.id_col] === d;
        });

        //Draw participant timeline.
        _this.participantTimeline.wrap.classed('hidden', false);
        webcharts.multiply(_this.participantTimeline, longParticipantData, _this.config.event_col);

        //Draw participant detail listing.
        _this.listing.wrap.classed('hidden', false);
        _this.listing.draw(wideParticipantData);
    });
}

function onDestroy() {
    
}

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
    
}

function onLayout$1() {
    
}

function onPreprocess$1() {
    
}

function onDatatransform$1() {
    
}

function onDraw$1() {
    
}

function onResize$1() {
    this.wrap.select('.legend').classed('hidden', true);
}

function onDestroy$1() {
    
}

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
    var participantTimeline = webcharts.createChart(clinicalTimelines.element, clinicalTimelines.config.participantSettings);

    for (var callback in callbacks$1) {
        participantTimeline.on(callback.substring(2).toLowerCase(), callbacks$1[callback]);
    }participantTimeline.clinicalTimelines = clinicalTimelines;
    participantTimeline.wrap.classed('hidden', true);

    return participantTimeline;
}

function onInit$2() {
    
}

function onLayout$2() {
    
}

function onDraw$2() {
    
}

function onDestroy$2() {
    
}

var callbacks$2 = {
    onInit: onInit$2,
    onLayout: onLayout$2,
    onDraw: onDraw$2,
    onDestroy: onDestroy$2
};

function listing(clinicalTimelines) {
    var listing = webcharts.createTable(clinicalTimelines.element, { cols: clinicalTimelines.config.details.map(function (d) {
            return d.value_col;
        }),
        headers: clinicalTimelines.config.details.map(function (d) {
            return d.label;
        }) });

    for (var callback in callbacks$2) {
        listing.on(callback.substring(2).toLowerCase(), callbacks$2[callback]);
    }listing.clinicalTimelines = clinicalTimelines;
    listing.init([]);
    listing.wrap.classed('hidden', true);

    return listing;
}

function clinicalTimelines() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var settings = arguments[1];

    //Define unique div within passed element argument.
    var container = d3.select(element).append('div').attr('id', 'clinical-timelines'),
        containerElement = container.node();

    //Define .css styles to avoid requiring a separate .css file.
    defineStyles();

    var mergedSettings = Object.assign({}, defaults.settings, settings),
        syncedSettings = defaults.syncSettings(mergedSettings),
        syncedControls = defaults.syncControls(defaults.controls, syncedSettings),
        controls = webcharts.createControls(containerElement, { location: 'top', inputs: syncedControls }),
        clinicalTimelines = webcharts.createChart(containerElement, syncedSettings, controls);

    for (var callback in callbacks) {
        clinicalTimelines.on(callback.substring(2).toLowerCase(), callbacks[callback]);
    }clinicalTimelines.element = containerElement;
    clinicalTimelines.participantTimeline = participantTimeline(clinicalTimelines);
    clinicalTimelines.listing = listing(clinicalTimelines);

    return clinicalTimelines;
}

return clinicalTimelines;

})));
