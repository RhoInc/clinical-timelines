import { select } from 'd3';

export default function addStriping() {
    const context = this;
    this.svg.selectAll('.ct-stripe').remove();
    const yAxisGridLines = this.svg.selectAll('.y.axis .tick').each(function(d, i) {
        //Offset tick label.
        select(this)
            .select('text')
            .attr('dy', context.y.rangeBand() / 3);

        //Insert a rectangle with which to visually group each ID's events.
        select(this)
            .insert('rect', ':first-child')
            .classed('ct-stripe', true)
            .attr({
                id: d,
                x: -context.margin.left + 1,
                y: -context.config.marks[0].attributes['stroke-width'],
                width: context.plot_width + context.margin.left,
                height: context.y.rangeBand() + context.config.marks[0].attributes['stroke-width']
            });
    });
}
