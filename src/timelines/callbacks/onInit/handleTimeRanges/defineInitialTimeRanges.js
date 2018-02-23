import { time } from 'd3';

export default function defineInitialTimeRanges() {
    this.date_range = this.config.date_ranges[0].domain.slice();
    this.day_range = this.config.day_ranges[0].domain.slice();
}
