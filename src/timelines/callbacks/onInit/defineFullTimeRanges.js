import { min, max, time } from 'd3';

export default function defineFullTimeRanges() {
    //date
    this.full_date_range = [
        min(this.initial_data, d =>
            time.format(this.config.date_format).parse(d[this.config.stdt_col])
        ),
        max(this.initial_data, d =>
            time.format(this.config.date_format).parse(d[this.config.endt_col])
        )
    ];
    this.full_date_time_range = this.full_date_range
        .map(d => time.format(this.config.date_format)(d))
        .join(' - ');
    this.config.date_ranges.push({
        time_scale: 'date',
        domain: this.full_date_range,
        time_range: this.full_date_time_range
    });

    //day
    this.full_day_range = [
        min(this.initial_data, d => +d[this.config.stdy_col]),
        max(this.initial_data, d => +d[this.config.endy_col])
    ];
    this.full_day_time_range = this.full_day_range.join(' - ');
    this.config.day_ranges.push({
        time_scale: 'day',
        domain: this.full_day_range,
        time_range: this.full_day_time_range
    });
}
