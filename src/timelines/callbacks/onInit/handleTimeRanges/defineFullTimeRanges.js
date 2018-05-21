import { min, max, time } from 'd3';

export default function defineFullTimeRanges() {
    /**-------------------------------------------------------------------------------------------\
      Dates
    \-------------------------------------------------------------------------------------------**/

    if (this.anyDates) {
        //full domain
        this.full_date_range = [
            min(this.initial_data, d =>
                time.format(this.config.date_format).parse(d[this.config.stdt_col])
            ),
            max(this.initial_data, d =>
                time.format(this.config.date_format).parse(d[this.config.endt_col])
            )
        ];

        //full domain as a string
        this.full_date_time_range = this.full_date_range
            .map(d => time.format(this.config.date_format)(d))
            .join(' - ');

        //add full domain to date ranges
        this.config.date_ranges.push({
            domain: this.full_date_range,
            label: 'Full'
        });

        //add custom domain to date ranges
        this.config.date_ranges.push({
            domain: this.full_date_range.slice(),
            label: 'User Input'
        });
    }

    /**-------------------------------------------------------------------------------------------\
      Days
    \-------------------------------------------------------------------------------------------**/

    if (this.anyDays) {
        //full domain
        this.full_day_range = [
            min(this.initial_data, d => +d[this.config.stdy_col]),
            max(this.initial_data, d => +d[this.config.endy_col])
        ];

        //full domain as a string
        this.full_day_time_range = this.full_day_range.join(' - ');

        //add full domain to day ranges
        this.config.day_ranges.push({
            domain: this.full_day_range,
            label: 'Full'
        });

        //add custom domain to day ranges
        this.config.day_ranges.push({
            domain: this.full_day_range.slice(),
            label: 'User Input'
        });
    }
}
