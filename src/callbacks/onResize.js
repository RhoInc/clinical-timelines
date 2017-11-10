import highlightEvent from './onResize/highlightEvent';
import legendFilter from './onResize/legendFilter';
import drawTopXaxis from './onResize/drawTopXaxis';
import { select } from 'd3';
import tickClick from './onResize/tickClick';
import offsetLines from './onResize/offsetLines';
import offsetCircles from './onResize/offsetCircles';
import annotateGrouping from './onResize/annotateGrouping';
import drawOngoingMarks from './onResize/drawOngoingMarks';
import drawReferenceLines from './onResize/drawReferenceLines';

export default function onResize() {
    const context = this;

    //Highlight events.
    highlightEvent.call(this);

    //Add filter functionality to legend.
    legendFilter.call(this);

    //Draw second x-axis at top of chart.
    drawTopXaxis.call(this);

    //Draw second chart when y-axis tick label is clicked.
    this.svg
        .selectAll('.y.axis .tick')
        .each(function(d) {
            if (/^-/.test(d)) select(this).remove();
        })
        .on('click', d => {
            this.selected_id = d;
            tickClick.call(this);
        });

    //Offset overlapping marks.
    this.config.marks.forEach((mark, i) => {
        const markData = this.marks[i].data;
        if (mark.type === 'line') {
            //Identify marks which represent ongoing events.
            if (this.config.ongo_col)
                markData.forEach(d => {
                    d.ongoing = d.values[0].values.raw[0][this.config.ongo_col];
                });
            offsetLines.call(this, mark, markData);
        } else if (mark.type === 'circle') {
            offsetCircles.call(this, mark, markData);
        }
    });

    //Annotate grouping.
    if (this.config.y.grouping) annotateGrouping.call(this);

    //Draw ongoing marks.
    if (this.config.ongo_col) drawOngoingMarks.call(this);

    //Draw reference lines.
    if (this.config.reference_lines) drawReferenceLines.call(this);

    //Offset bottom x-axis to prevent overlap with final ID.
    const bottomXaxis = this.svg.select('.x.axis'),
        bottomXaxisTitle = bottomXaxis.select('.axis-title');
    bottomXaxis.attr(
        'transform',
        `translate(0,${+bottomXaxis
            .attr('transform')
            .split(',')[1]
            .split(')')[0] + this.y.rangeBand()})`
    );
    bottomXaxisTitle.attr(
        'transform',
        `translate(
            ${+bottomXaxisTitle
                .attr('transform')
                .split(',')[0]
                .split('(')[1]},
            ${+bottomXaxisTitle
                .attr('transform')
                .split(',')[1]
                .split(')')[0] -
                7 * this.margin.bottom / 16})`
    );
}
