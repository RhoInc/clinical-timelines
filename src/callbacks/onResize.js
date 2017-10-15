import { svg } from 'd3';
import drawParticipantTimeline from './onResize/drawParticipantTimeline';

export default function onResize() {
    const context = this;

    //Draw second x-axis at top of chart.
    const topXaxis = svg
            .axis()
            .scale(this.x)
            .orient('top')
            .tickFormat(this.xAxis.tickFormat())
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
                this.config.margin.top / 2 +
                ')'
        );

    //Draw second chart when y-axis tick label is clicked.
    this.svg.selectAll('.y.axis .tick').on('click', d => {
        this.selected_id = d;
        drawParticipantTimeline.call(this);
    });

  //Offset overlapping marks.
    this.marks
        .forEach((mark,i) => {
            if (i === 1) {
                const
                    overlapping = d3.nest()
                        .key(d => d.total)
                        .mark.data
                        .filter(d => mark.data.map(d => console.log(d));
            }
        });
}
