import { select } from 'd3';

export default function drawOngoingMarks() {
    this.svg.selectAll('.ct-ongoing-event').remove();
    if (this.raw_data.length && this.raw_data[0].hasOwnProperty(this.config.ongo_col)) {
        const context = this;
        const lineSettings = this.config.marks.find(mark => mark.type === 'line');

        this.svg
            .selectAll('.line-supergroup .line')
            .filter(d => d.ongoing === this.config.ongo_val)
            .each(function(d) {
                const g = select(this);
                const endpoint = d.values[1];
                const x = context.x(context.config.time_function(endpoint.key));
                const y = context.y(endpoint.values.y) + context.y.rangeBand() / 2;
                const highlight = d.key.indexOf(context.config.event_highlighted) > -1;
                const length =
                    x +
                    (highlight
                        ? lineSettings.attributes['stroke-width'] * 1.5
                        : lineSettings.attributes['stroke-width'] * 1.5);
                const heightOffset = highlight
                    ? lineSettings.attributes['stroke-width'] * 2 / 3
                    : lineSettings.attributes['stroke-width'] * 2 / 3;
                const arrow = [[length, y], [x, y - heightOffset], [x, y + heightOffset]];

                g
                    .insert('polygon', 'line')
                    .datum(d)
                    .classed('ct-ongoing-event', true)
                    .classed('ct-highlighted', highlight)
                    .attr({
                        points: arrow.map(coordinate => coordinate.join(',')).join(' '),
                        fill: highlight
                            ? context.config.event_highlight_color
                            : context.colorScale(endpoint.values.raw[0][context.config.event_col]),
                        stroke: context.colorScale(
                            endpoint.values.raw[0][context.config.event_col]
                        ),
                        'clip-path': `url(#${context.id})`
                    });
            });
    }
}
