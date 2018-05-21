import { select } from 'd3';

export default function addStartStopCircles() {
    const context = this;

    this.svg.selectAll('.ct-start-stop-circle').remove();
    this.svg.selectAll('g.line').each(function(d) {
        var g = select(this);
        d.values
            .filter(
                (di, i) =>
                    !(
                        i === 1 &&
                        di.values.raw[0][context.config.ongo_col] === context.config.ongo_val
                    )
            )
            .forEach(function(di) {
                g
                    .append('circle')
                    .classed('ct-start-stop-circle', true)
                    .attr({
                        cx: context.x(di.values.x),
                        cy: context.y(di.values.y) + context.y.rangeBand() / 2,
                        r: context.config.mark_thickness * 2 / 5,
                        fill: 'white',
                        stroke: 'lightgray',
                        'clip-path': 'url(#' + context.id + ')'
                    });
            });
    });
}
