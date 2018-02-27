import { select } from 'd3';

export default function square(marks) {
    const context = this;

    marks
        .each(function(d) {
            const g = d3.select(this);

            //clear out g
            g.select('rect.ct-custom-square')
                .remove();
            g.select('circle')
                .classed('ct-hidden', true);

            //draw square
            const factor = 3/4;
            const x = context.x(d.values.x) - context.config.mark_thickness * factor;
            const y = context.y(d.values.y) + context.y.rangeBand()/2 - context.config.mark_thickness * factor;
            const width = context.config.mark_thickness * factor*2;
            const height = context.config.mark_thickness * factor*2;
            const fill = context.colorScale(d.values.raw[0][context.config.event_col]);
            const square = g.append('rect')
                .classed('ct-custom-square', true)
                .attr({
                    x,
                    y,
                    width,
                    height,
                    fill,
                    'clip-path': `url(#${context.id})`,
                    stroke: 'black'
                });
        });
}
