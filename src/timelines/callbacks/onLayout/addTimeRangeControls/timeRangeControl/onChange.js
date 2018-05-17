import { time } from 'd3';

export default function onChange(input, d) {
    const time_range = this.config.time_scale + '_range';
    const increment = this.config.time_scale === 'date' ? 24 * 60 * 60 * 1000 : 1;

    //User input.
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

    //Update time range.
    this[time_range][d.index] = inputValue;
    this.time_range = this[time_range];

    //Update custom time range setting.
    const customTimeRange = this.config[time_range + 's'].find(d => d.label === 'User Input');
    customTimeRange.domain = this.time_range.slice();

    //Update time range control.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.option === this.config.time_scale + '_time_range')
        .selectAll('option')
        .property('selected', function() {
            return this.value === 'User Input';
        })
        .filter(function() {
            return this.value === 'User Input';
        })
        .datum(customTimeRange.time_range);

    this.draw();
}
