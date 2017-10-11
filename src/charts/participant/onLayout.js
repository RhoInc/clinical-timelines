export default function onLayout() {
    //Add div for participant counts.
    this.wrap
        .select('.legend')
        .append('span')
        .classed('annote', true)
        .style('float', 'right');

    //Add top x-axis.
    var x2 = this.svg.append('g').attr('class', 'x2 axis linear');
    x2
        .append('text')
        .attr({
            class: 'axis-title top',
            dy: '2em',
            'text-anchor': 'middle'
        })
        .text(this.config.x_label);
}
