import { time } from 'd3';

export default function onChange(input, d) {
    const time_range = this.config.time_scale + '_range',
        increment = this.config.time_scale === 'date' ? 24 * 60 * 60 * 1000 : 1;
    let inputValue =
        this.config.time_scale === 'date'
            ? time.format('%Y-%m-%d').parse(input.value)
            : +input.value;

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

    this[time_range][d.index] = inputValue;
    this.time_range = this[time_range];

    if (+this.time_range[0] === +this.full_time_range[0] && +this.time_range[1] === +this.full_time_range[1]) {
        this.config.time_range = 'full';
    } else {
        this.config.time_range = 'custom';
    }

    this.draw();
}
