import { select } from 'd3';

export default function highlightMarks() {
    const context = this;

    this.svg.selectAll('.highlight-overlay').remove();

    //Highlight legend.
    this.wrap
        .selectAll('.legend-item')
        .classed('highlighted', d => d.label === this.config.event_highlighted);

    //Highlight marks.
    this.svg
        .selectAll('.wc-data-mark, .ongoing-event')
        .classed('highlighted', d => d.key.indexOf(this.config.event_highlighted) > -1)
        .filter(function() {
            return (
                this.tagName === 'path' && this.getAttribute('class').indexOf('highlighted') > -1
            );
        })
        .each(function(d) {
            const g = select(this.parentNode),
                line = g
                    .append('line')
                    .classed('highlight-overlay', true)
                    .attr({
                        x1: context.x(
                            context.config.time_scale === 'Study Day'
                                ? +d.values[0].key
                                : new Date(d.values[0].key)
                        ),
                        x2: context.x(
                            context.config.time_scale === 'Study Day'
                                ? +d.values[1].key
                                : new Date(d.values[1].key)
                        ),
                        y1:
                            context.y(d.values[0].values.raw[0][context.config.id_col]) +
                            context.y.rangeBand() / 2,
                        y2:
                            context.y(d.values[0].values.raw[0][context.config.id_col]) +
                            context.y.rangeBand() / 2,
                        stroke: context.colorScale(
                            d.values[0].values.raw[0][context.config.event_col]
                        )
                    });
        });
}
