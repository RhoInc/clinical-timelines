import { time } from 'd3';

export default function timeRangeControl(datum) {
    const context = this,
        timeRangeContainer = this.controls.wrap
            .insert('div', '#control-y-sort')
            .datum(datum)
            .classed('control-group time-range ct-control', true)
            .attr('id', d => `control-${d.option.replace(/\./g, '-')}`),
        timeRangeInput = timeRangeContainer.append('input').classed('changer', true),
        timeRangeLabelDescription = timeRangeContainer
            .append('div')
            .classed('label-description', true);

    //Add control label and span description nodes.
    timeRangeLabelDescription.append('span').classed('wc-control-label', true);
    timeRangeLabelDescription
        .append('span')
        .classed('span-description', true)
        .text(d => d.description);

    //Add event listener to input node.
    timeRangeInput.on('change', function(d) {
        const time_range = context.config.time_scale + '_range',
            increment = context.config.time_scale === 'date' ? 24 * 60 * 60 * 1000 : 1;
        let input =
            context.config.time_scale === 'date'
                ? time.format('%Y-%m-%d').parse(this.value)
                : +this.value;

        if (d.index === 0 && input >= context[time_range][1])
            input =
                context.config.time_scale === 'date'
                    ? new Date(context[time_range][1].getTime() - increment)
                    : context[time_range][1] - increment;
        else if (d.index === 1 && input <= context[time_range][0])
            input =
                context.config.time_scale === 'date'
                    ? new Date(context[time_range][0].getTime() + increment)
                    : (input = context[time_range][0] + increment);

        context[time_range][d.index] = input;
        context.time_range = context[time_range];
        context.draw();
    });
}
