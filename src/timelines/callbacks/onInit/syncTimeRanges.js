export default function syncTimeRanges() {
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
