import { time } from 'd3';

export default function hideInvalidTimeRangeOptions() {
    const context = this;

    this.controls.wrap
        .selectAll('#control-time_range option')
        .classed('ct-hidden', function() {
            const split = this.value.split(' - ');

            if (split.length === 2) {
                return (
                    (context.config.time_scale === 'date' && /^\d+$/.test(split[0])) ||
                    (context.config.time_scale === 'day' && time.format(context.config.date_format).parse(split[0]))
                );
            }

            return false;
        });
}
