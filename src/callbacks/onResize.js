import legendFilter from './onResize/legendFilter';
import drawTopXaxis from './onResize/drawTopXaxis';
import addStriping from './onResize/addStriping';
import tickClick from './onResize/tickClick';
import annotateGrouping from './onResize/annotateGrouping';
import offsetOverlappingMarks from './onResize/offsetOverlappingMarks';
import drawOngoingMarks from './onResize/drawOngoingMarks';
import highlightMarks from './onResize/highlightMarks';
import drawReferenceLines from './onResize/drawReferenceLines';
import offsetBottomXaxis from './onResize/offsetBottomXaxis';

export default function onResize() {
    const context = this;

    //Add filter functionality to legend.
    legendFilter.call(this);

    //Draw second x-axis at top of chart.
    drawTopXaxis.call(this);

    //Distinguish each timeline with striping.
    addStriping.call(this);

    //Draw second chart when y-axis tick label is clicked.
    tickClick.call(this);

    //Annotate grouping.
    annotateGrouping.call(this);

    //Offset overlapping marks.
    offsetOverlappingMarks.call(this);

    //Draw ongoing marks.
    drawOngoingMarks.call(this);

    //Highlight events.
    highlightMarks.call(this);

    //Draw reference lines.
    drawReferenceLines.call(this);

    //Offset bottom x-axis to prevent overlap with final ID.
    offsetBottomXaxis.call(this);
}
