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
    timeRangeLabelDescription.append('span').classed('control-label', true);
    timeRangeLabelDescription
        .append('span')
        .classed('span-description', true)
        .text(d => d.description);

    //Add event listener to input node.
    timeRangeInput.on('change', function(d) {
        const time_range = context.config.time_scale + '_range';
        context[time_range][d.index] =
            context.config.time_scale === 'date'
                ? time.format('%Y-%m-%d').parse(this.value)
                : +this.value;
        context.time_range = context[time_range];
        context.draw();
    });
}
