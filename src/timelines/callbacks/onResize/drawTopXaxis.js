import { svg, time, format } from 'd3';

export default function drawTopXaxis() {
    const topXaxis = svg
            .axis()
            .scale(this.x)
            .orient('top')
            .tickFormat(this.config.x_d3format)
            .innerTickSize(this.xAxis.innerTickSize())
            .outerTickSize(this.xAxis.outerTickSize())
            .ticks(this.xAxis.ticks()[0]),
        topXaxisSelection = this.svg.select('g.x-top.axis').attr('class', 'x-top axis linear');
    topXaxisSelection.call(topXaxis);
    topXaxisSelection
        .select('text.axis-title.top')
        .attr(
            'transform',
            'translate(' +
                (this.raw_width / 2 - this.margin.left) +
                ',-' +
                9 * this.config.margin.top / 16 +
                ')'
        )
        .text(this.config.x.label);
}
