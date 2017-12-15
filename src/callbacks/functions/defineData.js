import lengthenRaw from './lengthenRaw';
import { merge } from 'd3';

export default function defineData() {
    //Remove records with insufficient data (this.wide_data should only be defined on initialization).
    if (!this.hasOwnProperty('wide_data'))
        this.wide_data = this.raw_data.filter(
            d =>
                !(d.hasOwnProperty(this.config.stdy_col) && d[this.config.stdy_col] === '') &&
                !(d.hasOwnProperty(this.config.endy_col) && d[this.config.endy_col] === '') &&
                !(d.hasOwnProperty(this.config.stdt_col) && d[this.config.stdt_col] === '') &&
                !(d.hasOwnProperty(this.config.endt_col) && d[this.config.endt_col] === '') &&
                !/^\s*$/.test(d[this.config.id_col]) && // remove records with missing [id_col]
                !/^\s*$/.test(d[this.config.event_col]) // remove records with missing [event_col]
        );

    //Warn user of removed records.
    if (this.wide_data.length < this.raw_data.length) {
        console.warn(
            `${this.raw_data.length -
                this.wide_data
                    .length} records have been removed due to invalid data.\nPossible issues include\n  - missing or invalid study day variable values\n  - missing or invalid date variable values\n  - date variable values that do not match settings.date_format (${this
                .config.date_format})\n$  - missing identifiers or event types`
        );
    }

    //Separate out timepoints and time intervals.
    const timepoints = this.wide_data
            .filter(
                d =>
                    d[this.config.stdy_col] === d[this.config.endy_col] ||
                    d[this.config.stdt_col] === d[this.config.endt_col]
            )
            .map(d => {
                d.wc_category = this.config.time_scale === 'Study Day' ? 'DY' : 'DT';
                d.wc_value =
                    this.config.time_scale === 'Study Day'
                        ? d[this.config.stdy_col]
                        : d[this.config.stdt_col];
                return d;
            }),
        timeIntervals = lengthenRaw(
            this.wide_data.filter(
                d =>
                    d[this.config.stdy_col] !== d[this.config.endy_col] ||
                    d[this.config.stdt_col] !== d[this.config.endt_col]
            ),
            this.config.time_scale === 'Study Day'
                ? [this.config.stdy_col, this.config.endy_col]
                : [this.config.stdt_col, this.config.endt_col]
        );

    this.long_data = merge([timepoints, timeIntervals]);
    this.raw_data = this.long_data;
}
