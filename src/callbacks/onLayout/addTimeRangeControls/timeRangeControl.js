import { time } from 'd3';

export default function timeRangeControl(datum) {
    const
        context = this,
        timeRangeContainer = this.controls.wrap
            .insert('div', '#control-y-sort')
            .datum(datum)
            .classed('control-group ct-control', true)
            .attr('id', `control-${datum.option.replace('.', '-')}`),
        timeRangeInput = timeRangeContainer
            .append('input')
            .classed('changer', true)
            .property({
                'type': 'date',
                'value': time.format('%Y-%m-%d')(this.config.full_date_range[datum.index])
            }),
        timeRangeLabelDescription = timeRangeContainer
            .append('div')
            .classed('label-description', true);

    //Add control label and span description nodes.
    timeRangeLabelDescription
        .append('span')
        .classed('control-label', true);
    timeRangeLabelDescription
        .append('span')
        .classed('span-description', true)
        .text(datum.description);

    //Add event listener to input node.
    timeRangeInput.on('change', function() {
        context.config.x.domain[datum.index] = time.format('%Y-%m-%d').parse(this.value);
        context.draw();
    });
}
