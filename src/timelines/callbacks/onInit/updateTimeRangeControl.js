import { time } from 'd3';

export default function updateTimeRangeControls() {
    const timeRanges = [
        this.full_date_time_range,
        this.date_time_range,
        this.full_day_time_range,
        this.day_time_range
    ];
    this.controls.config.inputs.find(input => input.option === 'time_range').values = [
        'custom'
    ].concat(timeRanges);
}
