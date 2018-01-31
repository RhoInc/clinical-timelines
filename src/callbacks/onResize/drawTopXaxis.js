import { svg, time, format } from 'd3';

export default function drawTopXaxis() {
    const topXaxis = svg
            .axis()
            .scale(this.x)
            .orient('top')
            .ticks(this.xAxis.ticks()[0])
            .tickFormat(this.config.x_displayFormat)
            .innerTickSize(this.xAxis.innerTickSize())
            .outerTickSize(this.xAxis.outerTickSize()),
        topXaxisSelection = this.svg.select('g.x-top.axis').attr('class', 'x-top axis linear');
    topXaxisSelection.call(topXaxis);
    topXaxisSelection
        .select('text.axis-title.top')
        .attr({
            transform: 'translate(' + this.plot_width / 2 + ',' + -this.margin.top / 2 + ')',
            'text-anchor': 'middle'
        })
        .text(this.config.x.label);
}
