import lengthenRaw from './lengthenRaw';
import { merge } from 'd3';

export default function defineData() {
    //Separate out timepoints and time intervals.
    const timepoints = this.wide_data
            .filter(d => d[this.config.st_col] === d[this.config.en_col])
            .map(d => {
                d.wc_category = this.config.time_unit;
                d.wc_value = d[this.config.st_col];

                return d;
            }),
        timeIntervals = lengthenRaw(
            this.wide_data.filter(d => d[this.config.st_col] !== d[this.config.en_col]),
            [this.config.st_col, this.config.en_col]
        );

    this.long_data = merge([timepoints, timeIntervals]);
    this.raw_data = this.long_data;
}
