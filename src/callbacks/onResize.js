import highlightMarks from './onResize/highlightMarks';
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

    //Add filter functionality to legend.
    legendFilter.call(this);

    //Draw second x-axis at top of chart.
    drawTopXaxis.call(this);

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

    //Draw ongoing marks.
    if (this.config.ongo_col) drawOngoingMarks.call(this);

    //Highlight events.
    highlightMarks.call(this);

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

    //Annotate grouping.
    if (this.config.y.grouping) annotateGrouping.call(this);

    //Draw reference lines.
    if (this.config.reference_lines) drawReferenceLines.call(this);

    //Offset bottom x-axis to prevent overlap with final ID.
    const bottomXaxis = this.svg.select('.x.axis'),
        bottomXaxisTransform = bottomXaxis.attr('transform'),
        bottomXaxisTransformX =
            bottomXaxisTransform.indexOf(',') > -1
                ? +bottomXaxisTransform.split(',')[0].split('(')[1]
                : +bottomXaxisTransform.split(' ')[0].split('(')[1],
        bottomXaxisTransformY =
            bottomXaxisTransform.indexOf(',') > -1
                ? +bottomXaxisTransform.split(',')[1].split(')')[0]
                : +bottomXaxisTransform.split(' ')[1].split(')')[0],
        bottomXaxisTitle = bottomXaxis.select('.axis-title'),
        bottomXaxisTitleTransform = bottomXaxisTitle.attr('transform'),
        bottomXaxisTitleTransformX =
            bottomXaxisTitleTransform.indexOf(',') > -1
                ? +bottomXaxisTitleTransform.split(',')[0].split('(')[1]
                : +bottomXaxisTitleTransform.split(' ')[0].split('(')[1],
        bottomXaxisTitleTransformY =
            bottomXaxisTitleTransform.indexOf(',') > -1
                ? +bottomXaxisTitleTransform.split(',')[1].split(')')[0]
                : +bottomXaxisTitleTransform.split(' ')[1].split(')')[0];
    bottomXaxis.attr('transform', `translate(0,${bottomXaxisTransformY + this.y.rangeBand()})`);
    bottomXaxisTitle.attr(
        'transform',
        `translate(${bottomXaxisTitleTransformX},${bottomXaxisTitleTransformY -
            7 * this.margin.bottom / 16})`
    );

    //Replace newline characters with html line break entities to cater to Internet Explorer.
    if (!!document.documentMode)
        this.svg.selectAll('.line,.point').each(function(d) {
            const mark = select(this),
                tooltip = mark.select('title'),
                text = tooltip.text().split('\n');
            tooltip.text(text.join('--|--'));
        });
}
