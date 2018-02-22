import { time } from 'd3';

export default function defineInitialTimeRanges() {
    if (
        this.config.date_range instanceof Array &&
        this.config.date_range.length === 2 &&
        this.config.date_range[0].toString() !== this.config.date_range[1].toString() &&
        this.config.date_range.every(
            date => date instanceof Date || time.format(this.config.date_format).parse(date)
        )
    ) {
        this.date_range = this.config.date_range.map(
            date => (date instanceof Date ? date : time.format(this.config.date_format).parse(date))
        );
        this.date_time_range = this.config.date_range.join(' - ');
    } else {
        this.date_range = this.full_date_range.slice();
        this.date_time_range = this.full_date_time_range;
    }

    if (
        this.config.day_range instanceof Array &&
        this.config.day_range.length === 2 &&
        this.config.day_range[0].toString() !== this.config.day_range[1].toString() &&
        this.config.day_range.every(day => Number.isInteger(+day))
    ) {
        this.day_range = this.config.day_range.map(day => +day);
        this.day_time_range = this.config.day_range.join(' - ');
    } else {
        this.day_range = this.full_day_range.slice();
        this.day_time_range = this.full_day_time_range;
    }
}
