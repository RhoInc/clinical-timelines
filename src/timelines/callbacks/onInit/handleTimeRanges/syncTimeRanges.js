export default function syncTimeRanges() {
    if (this.config.time_scale === 'Date') this.time_range = this.date_range.slice();
    else this.time_range = this.day_range.slice();
}
