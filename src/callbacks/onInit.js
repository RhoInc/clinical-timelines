import { set } from 'd3';
import defineData from './functions/defineData';

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
        d[this.config.stdt_col] = /^\d{4}-\d\d-\d\d *$/.test(d[this.config.stdt_col])
            ? d[this.config.stdt_col]
            : '';
        d[this.config.endt_col] = /^\d{4}-\d\d-\d\d *$/.test(d[this.config.endt_col])
            ? d[this.config.endt_col]
            : d[this.config.stdt_col];
    });

    //Calculate number of total IDs and number of IDs with any event.
    this.populationDetails = {
        population: set(this.raw_data.map(d => d[this.config.id_col])).values()
    };
    this.populationDetails.N = this.populationDetails.population.length;
    this.IDdetails = {};

    //Remove records with insufficient data.
    this.wide_data = this.raw_data.filter(
        d =>
            d[this.config.stdy_col] !== NaN &&
            d[this.config.endy_col] !== NaN &&
            !(d.hasOwnProperty(this.config.stdt_col) && d[this.config.stdt_col] == '') &&
            !(d.hasOwnProperty(this.config.endt_col) && d[this.config.endt_col] == '') &&
            !/^\s*$/.test(d[this.config.id_col]) && // remove records with missing [id_col]
            !/^\s*$/.test(d[this.config.event_col]) // remove records with missing [event_col]
    );

    //Define a record for each start day and stop day.
    defineData.call(this);

    //Default event types to 'All'.
    this.allEventTypes = set(this.raw_data.map(d => d[this.config.event_col]))
        .values()
        .sort();
    this.currentEventTypes = this.config.event_types || this.allEventTypes;
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
            //Set values of Event Type highlighting control to event types present in the data.
            if (input.label === 'Event Type' && input.description === 'highlighting')
                input.values = this.config.color_dom;
            else if (input.label === 'Y-axis' && input.description === 'grouping')
                input.values = this.config.groupings.map(grouping => grouping.value_col);

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
