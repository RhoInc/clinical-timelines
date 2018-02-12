import { select } from 'd3';

export default function drawOngoingMarks() {
    if (this.raw_data.length && this.raw_data[0].hasOwnProperty(this.config.ongo_col)) {
        const context = this;

        this.svg.selectAll('.ct-ongoing-event').remove();
        this.svg
            .selectAll('.line-supergroup .line')
            .filter(d => d.ongoing === this.config.ongo_val)
            .each(function(d) {
                const g = select(this),
                    endpoint = d.values[1],
                    x = context.x(context.config.time_function(endpoint.key)),
                    y = context.y(endpoint.values.y) + context.y.rangeBand() / 2,
                    color = context.colorScale(endpoint.values.raw[0][context.config.event_col]),
                    arrow = [[x + 8, y], [x, y - 3], [x, y + 3]];

                g
                    .append('polygon')
                    .datum(d)
                    .classed('ct-ongoing-event', true)
                    .attr({
                        points: arrow.map(coordinate => coordinate.join(',')).join(' '),
                        fill: color,
                        stroke: color,
                        'clip-path': `url(#${context.id})`
                    });
            });
    }
}
