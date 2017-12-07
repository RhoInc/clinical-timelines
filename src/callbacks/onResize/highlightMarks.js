import { select } from 'd3';

export default function highlightMarks() {
    const context = this;

    this.svg.selectAll('.highlight-overlay').remove();

    //Highlight legend.
    this.wrap
        .selectAll('.legend-item')
        .classed('highlighted', d => d.label === this.config.event_highlighted);

    //Highlight marks.
    const highlightedMarks = this.svg
            .selectAll('.wc-data-mark, .ongoing-event')
            .classed('highlighted', d => d.key.indexOf(this.config.event_highlighted) > -1)
            .filter(d => d.key.indexOf(this.config.event_highlighted) > -1),
        paths = highlightedMarks
            .filter(function() {
                return (
                    this.tagName === 'path' &&
                    this.getAttribute('class').indexOf('highlighted') > -1
                );
            })
            .each(function(d, i) {
                const g = select(this.parentNode),
                    x1 = context.x(
                        context.config.time_scale === 'Study Day'
                            ? +d.values[0].key
                            : new Date(d.values[0].key)
                    ),
                    x2 = context.x(
                        context.config.time_scale === 'Study Day'
                            ? +d.values[1].key
                            : new Date(d.values[1].key)
                    ),
                    y =
                        context.y(
                            d.values[0].values.raw[0][
                                context.parent ? context.config.seq_col : context.config.id_col
                            ]
                        ) +
                        context.y.rangeBand() / 2,
                    color = context.config.event_highlight_color,
                    line = g
                        .append('line')
                        .classed('highlight-overlay', true)
                        .attr({
                            x1: x1,
                            x2: x2,
                            y1: y,
                            y2: y,
                            stroke: color
                        });

                if (d.ongoing === context.config.ongo_val) {
                    const arrow = [[x2 + 7, y], [x2, y - 2.5], [x2, y + 2.5]],
                        polygon = g
                            .append('polygon')
                            .datum(d)
                            .classed('highlighted ongoing-event', true)
                            .attr({
                                points: arrow.map(coordinate => coordinate.join(',')).join(' '),
                                fill: color
                            });
                }
            }),
        circles = highlightedMarks
            .filter(function() {
                return (
                    this.tagName === 'circle' &&
                    this.getAttribute('class').indexOf('highlighted') > -1
                );
            })
            .attr({
                stroke: d => this.colorScale(d.values.raw[0][this.config.event_col]),
                fill: d => this.config.event_highlight_color
            });
}