import { time } from 'd3';

export default function onChange(input, d) {
    const context = this;
    const time_range = this.config.time_scale + '_range';
    const increment = this.config.time_scale === 'date' ? 24 * 60 * 60 * 1000 : 1;
    let inputValue =
        this.config.time_scale === 'date'
            ? time.format('%Y-%m-%d').parse(input.value)
            : +input.value;

    //handle invalid inputs
    if (d.index === 0 && inputValue >= this[time_range][1])
        inputValue =
            this.config.time_scale === 'date'
                ? new Date(this[time_range][1].getTime() - increment)
                : this[time_range][1] - increment;
    else if (d.index === 1 && inputValue <= this[time_range][0])
        inputValue =
            this.config.time_scale === 'date'
                ? new Date(this[time_range][0].getTime() + increment)
                : (inputValue = this[time_range][0] + increment);

    //update time range settings
    this[time_range][d.index] = inputValue;
    this.time_range = this[time_range];
    this.config.time_range = this.time_range
        .map(d => (d instanceof Date ? time.format(this.config.date_format)(d) : '' + d))
        .join(' - ');
    this[this.config.time_scale + '_time_range'] = this.config.time_range;

    //update time range control
    if (
        this.controls.config.inputs
            .find(input => input.option === 'time_range')
            .values.indexOf(this.config.time_range) < 0
    )
        this.config.time_range = 'custom';
    this[this.time_scale + '_time_range'] = this.config.time_range;
    this.controls.wrap.selectAll('#control-time_range option').property('selected', function() {
        return this.value === context.config.time_range;
    });

    this.draw();
}
