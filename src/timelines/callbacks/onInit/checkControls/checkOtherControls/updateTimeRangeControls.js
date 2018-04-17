export default function updateTimeRangeControls() {
    if (this.anyDates) {
        //Update date time range dropdown.
        this.controls.config.inputs.find(
            input => input.option === 'date_time_range'
        ).values = this.config.date_ranges.map(date_time_range => date_time_range.label);
        this.config.date_time_range = this.config.date_ranges[0].label;
    }

    if (this.anyDays) {
        //Update day time range dropdown.
        this.controls.config.inputs.find(
            input => input.option === 'day_time_range'
        ).values = this.config.day_ranges.map(day_time_range => day_time_range.label);
        this.config.day_time_range = this.config.day_ranges[0].label;
    }
}
