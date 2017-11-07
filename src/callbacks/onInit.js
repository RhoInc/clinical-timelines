import { set, merge } from 'd3';
import lengthenRaw from './onInit/lengthenRaw';

export default function onInit() {
    const context = this;

    //Data manipulation
    this.raw_data.forEach(d => {
        d[this.config.stdy_col] = /^ *\d+ *$/.test(d[this.config.stdy_col])
            ? +d[this.config.stdy_col]
            : NaN;
        d[this.config.endy_col] = /^ *\d+ *$/.test(d[this.config.endy_col])
            ? +d[this.config.endy_col]
            : d[this.config.stdy_col];
    });

    //Calculate number of total participants and number of participants with any event.
    this.populationDetails = {
        population: set(this.raw_data.map(d => d[this.config.id_col])).values()
    };
    this.populationDetails.N = this.populationDetails.population.length;
    this.participantDetails = {};

    //Remove records with insufficient data.
    this.wide_data = this.raw_data.filter(
        d =>
            d[this.config.stdy_col] !== NaN &&
            d[this.config.endy_col] !== NaN &&
            !/^\s*$/.test(d[this.config.id_col]) && // remove records with missing [id_col]
            !/^\s*$/.test(d[this.config.event_col]) // remove records with missing [event_col]
    );

    //Define a record for each start day and stop day.
    const singleDayEvents = this.raw_data
            .filter(d => d[this.config.stdy_col] === d[this.config.endy_col])
            .map(d => {
                d.wc_category = 'DY';
                d.wc_value = d[this.config.stdy_col];
                return d;
            }),
        multiDayEvents = lengthenRaw(
            this.raw_data.filter(d => d[this.config.stdy_col] !== d[this.config.endy_col]),
            [this.config.stdy_col, this.config.endy_col]
        );
    this.raw_data = merge([singleDayEvents, multiDayEvents]);

    //Default event types to 'All'.
    this.allEventTypes = set(this.raw_data.map(d => d[this.config.event_col]))
        .values()
        .sort();
    this.currentEventTypes = this.config.eventTypes || this.allEventTypes;
    this.config.color_dom =
        this.currentEventTypes !== 'All'
            ? this.currentEventTypes.concat(
                  this.allEventTypes
                      .filter(eventType => this.currentEventTypes.indexOf(eventType) === -1)
                      .sort()
              )
            : this.allEventTypes;
    this.config.legend.order = this.config.color_dom;

    //Remove filters for variables fewer than two levels.
    this.controls.config.inputs = this.controls.config.inputs.filter(input => {
        if (input.type !== 'subsetter') {
            if (input.label === 'Highlighted Event Type') input.values = this.config.color_dom;

            return true;
        } else {
            const levels = set(this.raw_data.map(d => d[input.value_col])).values();

            if (levels.length < 2) {
                console.warn(
                    input.value_col + ' filter removed because the variable has only one level.'
                );
            }

            return levels.length > 1;
        }
    });

    //Add data-driven tooltips.
    if (this.raw_data[0].hasOwnProperty(this.config.tooltip_col))
        this.config.marks.forEach(mark => {
            mark.tooltip = `${mark.tooltip}\n[${this.config.tooltip_col}]`;
        });
}
