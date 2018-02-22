import { min, max, time } from 'd3';

export default function setDefaultTimeRanges() {
    //Date range
    this.full_date_range = [
        min(this.initial_data, d =>
            time.format(this.config.date_format).parse(d[this.config.stdt_col])
        ),
        max(this.initial_data, d =>
            time.format(this.config.date_format).parse(d[this.config.endt_col])
        )
    ];
    if (
        this.config.date_range instanceof Array &&
        this.config.date_range.length === 2 &&
        this.config.date_range[0].toString() !== this.config.date_range[1].toString() &&
        this.config.date_range.every(
            date => date instanceof Date || time.format(this.config.date_format).parse(date)
        )
    ) {
        this.date_range = this.config.date_range.map(
                  date =>
                      date instanceof Date ? date : time.format(this.config.date_format).parse(date)
              )
        this.date_time_range = this.config.date_range.join(' - ');
        this.controls.config.inputs
            .find(input => input.option === 'time_range')
            .values
            .push(this.date_time_range);
    } else
        this.date_range = this.full_date_range.slice();

    //Day range
    this.full_day_range = [
        min(this.initial_data, d => +d[this.config.stdy_col]),
        max(this.initial_data, d => +d[this.config.endy_col])
    ];
    if (
        this.config.day_range instanceof Array &&
        this.config.day_range.length === 2 &&
        this.config.day_range[0].toString() !== this.config.day_range[1].toString() &&
        this.config.day_range.every(day => Number.isInteger(+day))
    ) {
        this.day_range = this.config.day_range.map(day => +day)
        this.day_time_range = this.config.day_range.join(' - ');
        this.controls.config.inputs
            .find(input => input.option === 'time_range')
            .values
            .push(this.day_time_range);
    } else
        this.day_range = this.full_day_range.slice();

    //Update time range settings.
    if (this.config.time_scale === 'date') {
        this.time_range = this.date_range.slice();
        this.full_time_range = this.full_date_range.slice();
        this.config.time_range = this.date_time_range;
    } else {
        this.time_range = this.day_range.slice();
        this.full_time_range = this.full_day_range.slice();
        this.config.time_range = this.day_time_range;
    }
}
