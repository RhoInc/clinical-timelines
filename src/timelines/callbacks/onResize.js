import legendFilter from './onResize/legendFilter';
import drawTopXaxis from './onResize/drawTopXaxis';
import addTooltip from './onResize/addTooltip';
import tickClick from './onResize/tickClick';
import annotateGrouping from './onResize/annotateGrouping';
import addStriping from './onResize/addStriping';
import offsetOverlappingMarks from './onResize/offsetOverlappingMarks';
import highlightMarks from './onResize/highlightMarks';
import drawOngoingMarks from './onResize/drawOngoingMarks';
import addStartStopCircles from './onResize/addStartStopCircles';
import addSymbols from './onResize/addSymbols';
import addSymbolsToLegend from './onResize/addSymbolsToLegend';
import offsetBottomXaxis from './onResize/offsetBottomXaxis';
import drawReferenceLines from './onResize/drawReferenceLines';
import IEsucks from './onResize/IEsucks';
import setClipPath from './onResize/setClipPath';

export default function onResize() {
    //Add filter functionality to legend.
    legendFilter.call(this);

    //Draw second x-axis at top of chart.
    drawTopXaxis.call(this);

    //Add tick lines that display the tick label on hover.
    addTooltip.call(this);

    //Draw second chart when y-axis tick label is clicked.
    tickClick.call(this);

    //Annotate grouping.
    annotateGrouping.call(this);

    //Distinguish each timeline with striping.
    addStriping.call(this);

    //Offset overlapping marks.
    offsetOverlappingMarks.call(this);

    //Draw ongoing marks.
    drawOngoingMarks.call(this);

    //Highlight marks.
    highlightMarks.call(this);

    //Draw ongoing marks.
    drawOngoingMarks.call(this);

    //Draw circles at beginning and end of each line.
    addStartStopCircles.call(this);

    //Add symbols.
    addSymbols.call(this);

    //Add symbols to legend.
    addSymbolsToLegend.call(this);

    //Offset bottom x-axis to prevent overlap with final ID.
    offsetBottomXaxis.call(this);

    //Draw reference lines.
    drawReferenceLines.call(this);

    //Replace newline characters with html line break entities to cater to Internet Explorer.
    IEsucks.call(this);

    //Set clip-path of all svg elements to the ID of the current chart.
    setClipPath.call(this);
}
