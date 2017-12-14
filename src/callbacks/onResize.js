import legendFilter from './onResize/legendFilter';
import drawTopXaxis from './onResize/drawTopXaxis';
import tickClick from './onResize/tickClick';
import annotateGrouping from './onResize/annotateGrouping';
import offsetMarks from './onResize/offsetMarks';
import highlightMarks from './onResize/highlightMarks';
import drawOngoingMarks from './onResize/drawOngoingMarks';
import offsetBottomXaxis from './onResize/offsetBottomXaxis';
import drawReferenceLines from './onResize/drawReferenceLines';
import IEsucks from './onResize/IEsucks';

export default function onResize() {
    const context = this;

    //Add filter functionality to legend.
    legendFilter.call(this);

    //Draw second x-axis at top of chart.
    drawTopXaxis.call(this);

    //Draw second chart when y-axis tick label is clicked.
    tickClick.call(this);

    //Annotate grouping.
    annotateGrouping.call(this);

    //Offset overlapping marks.
    offsetMarks.call(this);

    //Highlight events.
    highlightMarks.call(this);

    //Draw ongoing marks.
    drawOngoingMarks.call(this);

    //Offset bottom x-axis to prevent overlap with final ID.
    offsetBottomXaxis.call(this);

    //Draw reference lines.
    drawReferenceLines.call(this);

    //Replace newline characters with html line break entities to cater to Internet Explorer.
    IEsucks.call(this);
}
