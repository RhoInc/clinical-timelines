import { time } from 'd3';

export default function updateTimeRangeControls() {
    this.controls.wrap.selectAll('.time-range input').property({
        type: this.config.time_scale === 'date' ? 'date' : 'number',
        value: d =>
            this.config.time_scale === 'date'
                ? time.format('%Y-%m-%d')(this.time_range[d.index])
                : +this.time_range[d.index]
    });
}
