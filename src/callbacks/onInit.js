import { set } from 'd3';
import defineData from './functions/defineData';
import handleEventTypes from './onInit/handleEventTypes';
import removeFilters from './onInit/removeFilters';
import removeSiteReferences from './onInit/removeSiteReferences';
import addDataDrivenTooltips from './onInit/addDataDrivenTooltips';

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
    handleEventTypes.call(this);

    //Remove filters for variables fewer than two levels.
    removeFilters.call(this);

    //Remove references to site_col if column does not exist.
    removeSiteReferences.call(this);

    //Add data-driven tooltips.
    addDataDrivenTooltips.call(this);
}
