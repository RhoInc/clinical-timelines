import { svg, select } from 'd3';
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
    this.config.marks.forEach((mark, i) => {
        const markData = this.marks[i].data;
        if (mark.type === 'line') {
        } else if (mark.type === 'circle') {
            const overlapping = d3
                .nest()
                .key(d => d.total + '|' + d.values.raw[0][this.config.id_col])
                .rollup(d => {
                    return {
                        n: d.length,
                        keys: d.map(di => di.key)
                    };
                })
                .entries(markData)
                .filter(d => d.values.n > 1);
            overlapping.forEach(d => {
                const x = d.key.split('|')[0],
                    y = d.key.split('|')[1];
                d.values.keys.forEach((di, i) => {
                    const className = `${di} point`,
                        g = select(document.getElementsByClassName(className)[0]),
                        point = g.select('circle');
                    g.attr('transform', `translate(0,${i * +mark.radius * 2})`);
                });
            });
        }
    });
}
