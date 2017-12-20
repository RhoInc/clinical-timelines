import '../../util/number-isinteger';
import { min, max, time } from 'd3';

export default function setDefaultTimeRanges() {
    //Day range
    this.config.full_day_range = [
        min(this.initial_data, d => +d[this.config.stdy_col]),
        max(this.initial_data, d => +d[this.config.endy_col])
    ];
    this.config.day_range =
        this.config.day_range instanceof Array &&
        this.config.day_range.length === 2 &&
        this.config.day_range[0].toString() !== this.config.day_range[1].toString() &&
        this.config.day_range.every(day => Number.isInteger(+day))
            ? this.config.day_range.map(day => +day)
            : this.config.full_day_range;

    //Date range
    this.config.full_date_range = [
        min(this.initial_data, d =>
            time.format(this.config.date_format).parse(d[this.config.stdt_col])
        ),
        max(this.initial_data, d =>
            time.format(this.config.date_format).parse(d[this.config.endt_col])
        )
    ];
    this.config.date_range =
        this.config.date_range instanceof Array &&
        this.config.date_range.length === 2 &&
        this.config.date_range[0].toString() !== this.config.day_range[1].toString() &&
        this.config.date_range.every(
            date => date instanceof Date || time.format(this.config.date_format).parse(date)
        )
            ? this.config.date_range.map(
                  date =>
                      date instanceof Date ? date : time.format(this.config.date_format).parse(date)
              )
            : this.config.full_date_range;
}
