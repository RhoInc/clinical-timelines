import { time } from 'd3';

export default function hideTimeRangeControl() {
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.option && d.option.indexOf('_time_range') > -1)
        .classed(
            'ct-hidden',
            d =>
                (this.config.time_scale === 'Date' && d.option === 'day_time_range') ||
                (this.config.time_scale === 'Day' && d.option === 'date_time_range')
        );
}
