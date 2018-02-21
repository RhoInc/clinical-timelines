import { set } from 'd3';
import manipulateData from './onInit/manipulateData';
import cleanData from './functions/cleanData';
import defineData from './functions/defineData';
import setDefaultTimeRanges from './onInit/setDefaultTimeRanges';
import handleEventTypes from './onInit/handleEventTypes';
import checkOtherControls from './onInit/checkOtherControls';
import checkFilters from './onInit/checkFilters';
import addDataDrivenTooltips from './onInit/addDataDrivenTooltips';

export default function onInit() {
    //Capture and count all IDs in data.
    this.populationDetails = {
        population: set(this.raw_data.map(d => d[this.config.id_col])).values()
    };
    this.populationDetails.N = this.populationDetails.population.length;

    //Instantiate ID details.
    this.IDdetails = {};

    //Retain initial data array, removing records with missing key variables.
    this.initial_data = this.raw_data.filter(
        d => !/^\s*$/.test(d[this.config.id_col]) && !/^\s*$/.test(d[this.config.event_col])
    );

    //Manually set controls' data.
    this.controls.data = this.initial_data;
    this.controls.ready = true;

    //Warn user of removed records.
    if (this.initial_data.length < this.raw_data.length)
        console.warn(
            `${this.raw_data.length -
                this.initial_data
                    .length} records have been removed due to missing identifiers or event types.`
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
    this.time_range = this.config.time_scale === 'day' ? this.day_range.slice() : this.date_range.slice();
    this.full_time_range = this.config.time_scale === 'day' ? this.full_day_range.slice() : this.full_date_range.slice();

    //Add data-driven tooltips.
    addDataDrivenTooltips.call(this);

    //Remove unusable data.
    cleanData.call(this);

    //Define a record for each start day and stop day.
    defineData.call(this);
}
