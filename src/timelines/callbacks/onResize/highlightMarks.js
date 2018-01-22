import { select } from 'd3';

export default function highlightMarks() {
    const context = this;

    //Clear line overlays.
    this.svg.selectAll('.ct-highlight-overlay').remove();

    //Highlight legend.
    this.wrap
        .selectAll('.legend-item')
        .classed('ct-highlighted', d => d.label === this.config.event_highlighted);

    //Select marks.
    const highlightedMarks = this.svg
        .selectAll('.wc-data-mark, .ct-ongoing-event')
        .classed('ct-highlighted', d => d.key.indexOf(this.config.event_highlighted) > -1)
        .filter(d => d.key.indexOf(this.config.event_highlighted) > -1);

    //Highlight Lines.
    const paths = highlightedMarks.filter(function() {
        return this.tagName === 'path' && this.getAttribute('class').indexOf('highlighted') > -1;
    });
    paths.each(function(d, i) {
        const g = select(this.parentNode),
            x1 = context.x(context.config.time_function(d.values[0].key)),
            x2 = context.x(context.config.time_function(d.values[1].key)),
            y =
                context.y(
                    d.values[0].values.raw[0][
                        context.config.y.column === context.config.id_col
                            ? context.config.id_col
                            : context.config.seq_col
                    ]
                ) +
                context.y.rangeBand() / 2,
            color = context.config.event_highlight_color,
            line = g
                .append('line')
                .classed('ct-highlight-overlay', true)
                .attr({
                    x1: x1,
                    x2: x2,
                    y1: y,
                    y2: y,
                    stroke: color,
                    'clip-path': `url(#${context.id})`
                });

        if (d.ongoing === context.config.ongo_val) {
            const arrow = [[x2 + 7, y], [x2, y - 2.5], [x2, y + 2.5]],
                polygon = g
                    .append('polygon')
                    .datum(d)
                    .classed('ct-highlighted ct-ongoing-event', true)
                    .attr({
                        points: arrow.map(coordinate => coordinate.join(',')).join(' '),
                        fill: color
                    });
        }
    });

    //Highlight circles.
    const circles = highlightedMarks.filter(function() {
        return this.tagName === 'circle' && this.getAttribute('class').indexOf('highlighted') > -1;
    });
    circles.attr({
        stroke: d => this.colorScale(d.values.raw[0][this.config.event_col]),
        fill: d => this.config.event_highlight_color
    });
}
