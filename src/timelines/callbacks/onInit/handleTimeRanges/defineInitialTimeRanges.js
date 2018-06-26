import { time } from 'd3';

export default function defineInitialTimeRanges() {
    if (this.anyDates) this.date_range = this.config.date_ranges[0].domain.slice();
    if (this.anyDays) this.day_range = this.config.day_ranges[0].domain.slice();
}
