import lengthenRaw from './lengthenRaw';
import { merge } from 'd3';

//Define a record for each timepoint and a record for both the start and end of a time interval.
export default function defineData() {
    //Capture timepoints.
    const timepoints = this.wide_data
        .filter(d => d[this.config.st_col] === d[this.config.en_col])
        .map(d => {
            d.wc_category = this.config.time_unit;
            d.wc_value = d[this.config.st_col];

            return d;
        });

    //Capture time intervals, creating two records for each event..
    const timeIntervals = lengthenRaw(
        this.wide_data.filter(d => d[this.config.st_col] !== d[this.config.en_col]),
        [this.config.st_col, this.config.en_col]
    );

    //Merge timepoints and time intervals.
    this.long_data = merge([timepoints, timeIntervals]);
    this.raw_data = this.long_data;
}
