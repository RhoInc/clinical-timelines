import { time, set, min, max } from 'd3';
import defineData from './functions/defineData';
import handleEventTypes from './onInit/handleEventTypes';
import removeFilters from './onInit/removeFilters';
import addDataDrivenTooltips from './onInit/addDataDrivenTooltips';

export default function onInit() {
    const context = this;

    //Data manipulation
    this.raw_data.forEach((d, i) => {
        if (!/^ *\d+ *$/.test(d[this.config.stdy_col])) d[this.config.stdy_col] = '';
        if (!/^ *\d+ *$/.test(d[this.config.endy_col]))
            d[this.config.endy_col] = d[this.config.stdy_col];
        if (!time.format(this.config.date_format).parse(d[this.config.stdt_col]))
            d[this.config.stdt_col] = '';
        if (!time.format(this.config.date_format).parse(d[this.config.endt_col]))
            d[this.config.endt_col] = d[this.config.stdt_col];
    });

    //Calculate number of total IDs and number of IDs with any event.
    this.populationDetails = {
        population: set(this.raw_data.map(d => d[this.config.id_col])).values()
    };
    this.populationDetails.N = this.populationDetails.population.length;
    this.IDdetails = {};

    //Define a record for each start day and stop day.
    defineData.call(this);

    //Define x-domain.
    this.config.study_day_range = this.config.study_day_range || [
        min(this.raw_data, d => +d[this.config.stdy_col]),
        max(this.raw_data, d => +d[this.config.endy_col])
    ];
    this.config.date_range =
        this.config.date_range instanceof Array && this.config.date_range.length === 2
            ? this.config.date_range.map(
                  date =>
                      date instanceof Date ? date : time.format(this.config.date_format).parse(date)
              )
            : [
                  min(this.raw_data, d =>
                      time.format(this.config.date_format).parse(d[this.config.stdt_col])
                  ),
                  max(this.raw_data, d =>
                      time.format(this.config.date_format).parse(d[this.config.endt_col])
                  )
              ];

    //Default event types to 'All'.
    handleEventTypes.call(this);

    //Remove filters for variables fewer than two levels.
    removeFilters.call(this);

    //Add data-driven tooltips.
    addDataDrivenTooltips.call(this);
}
