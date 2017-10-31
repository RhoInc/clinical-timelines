import { set } from 'd3';
import lengthenRaw from './onInit/lengthenRaw';

export default function onInit() {
    const context = this;

    //Remove records with insufficient data.
    this.wide_data = this.raw_data.filter(
        d =>
            /^\d+$/.test(d[this.config.stdy_col]) && // keep only records with start days
            !/^\s*$/.test(d[this.config.id_col]) && // remove records with missing [id_col]
            !/^\s*$/.test(d[this.config.event_col]) // remove records with missing [event_col]
    );

    //Calculate number of total participants and number of participants with any event.
    this.populationDetails = {
        population: set(this.raw_data.map(d => d[this.config.id_col])).values()
    };
    this.populationDetails.N = this.populationDetails.population.length;
    this.participantDetails = {};

    //Define a record for each start day and stop day.
    this.raw_data = lengthenRaw(this.wide_data, [this.config.stdy_col, this.config.endy_col]);
    this.raw_data.forEach(d => {
        d.wc_value = d.wc_value ? +d.wc_value : NaN;
    });

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
            //Set values of Event Type highlighting control to event types present in the data.
            if (input.label === 'Event Type' && input.description === 'highlighting')
                input.values = this.config.color_dom;

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
}
