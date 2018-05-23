import { time } from 'd3';

export default function updateTimeRangeControls() {
    const timeRangeControls = this.controls.wrap.selectAll('.ct-time-range input');

    //Internet Explorer does not support input date type.
    timeRangeControls.property(
        'type',
        !this.clinicalTimelines.document.documentMode
            ? this.config.time_scale === 'Date'
                ? 'date'
                : 'number'
            : 'text'
    );

    timeRangeControls.property(
        'value',
        d =>
            this.config.time_scale === 'Date'
                ? time.format(this.config.date_format)(this.time_range[d.index])
                : +this.time_range[d.index]
    );
}
