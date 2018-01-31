import { time } from 'd3';

export default function updateTimeRangeControls() {
    const timeRangeControls = this.controls.wrap.selectAll('.time-range input');
    timeRangeControls.property(
        'value',
        d =>
            this.config.time_scale === 'date'
                ? time.format('%Y-%m-%d')(this.time_range[d.index])
                : +this.time_range[d.index]
    );

    //Internet Explorer does not support input date type.
    if (!document.documentMode)
        timeRangeControls.property('type', this.config.time_scale === 'date' ? 'date' : 'number');
}
