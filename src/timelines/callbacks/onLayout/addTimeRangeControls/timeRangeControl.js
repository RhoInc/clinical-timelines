import onChange from './timeRangeControl/onChange';

export default function timeRangeControl(datum) {
    const context = this,
        timeRangeContainer = this.controls.wrap
            .insert('div', '#control-y-sort')
            .datum(datum)
            .classed('control-group ct-time-range ct-control', true)
            .attr('id', d => `control-${d.option.replace(/\./g, '-')}`),
        timeRangeInput = timeRangeContainer.append('input').classed('changer', true),
        timeRangeLabelDescription = timeRangeContainer
            .append('div')
            .classed('ct-label-description', true);

    //Add control label and span description nodes.
    timeRangeLabelDescription.append('span').classed('wc-control-label', true);
    timeRangeLabelDescription
        .append('span')
        .classed('span-description', true)
        .text(d => d.description);

    //Add event listener to input node.
    timeRangeInput.on('change', function(d) {
        onChange.call(context, this, d);
    });
}
