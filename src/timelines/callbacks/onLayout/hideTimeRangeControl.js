import { time } from 'd3';

export default function hideTimeRangeControl() {
    this.controls.wrap
        .selectAll('.control-group')
        .classed(
            'ct-hidden',
            d =>
                (this.config.time_scale === 'date' && d.option === 'day_time_range') ||
                (this.config.time_scale === 'day' && d.option === 'date_time_range')
        );
}
