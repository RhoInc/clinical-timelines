import { select } from 'd3';

export default function addStriping() {
    const context = this;
    this.svg.selectAll('.ct-stripe').remove();
    const yAxisGridLines = this.svg.selectAll('.y.axis .tick').each(function(d, i) {
        select(this)
            .select('text')
            .attr('dy', context.y.rangeBand() / 2);
        select(this)
            .insert('rect', ':first-child')
            .attr({
                id: d,
                x: -context.margin.left,
                y: -context.config.marks[0].attributes['stroke-width'],
                width: context.plot_width + context.margin.left,
                height: context.y.rangeBand() + context.config.marks[0].attributes['stroke-width']
            })
            .classed('ct-stripe', true);
    });
}
