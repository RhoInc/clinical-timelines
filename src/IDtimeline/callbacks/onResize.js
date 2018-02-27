import drawOngoingMarks from '../../timelines/callbacks/onResize/drawOngoingMarks';
import drawTimeRange from './onResize/drawTimeRange';
import drawReferenceLines from '../../timelines/callbacks/onResize/drawReferenceLines';
import addStartStopCircles from '../../timelines/callbacks/onResize/addStartStopCircles';
import addSymbols from '../../timelines/callbacks/onResize/addSymbols';
import highlightMarks from '../../timelines/callbacks/onResize/highlightMarks';
import IEsucks from '../../timelines/callbacks/onResize/IEsucks';

export default function onResize() {
    //Hide legend.
    this.wrap.select('.legend').classed('ct-hidden', true);

    //Draw ongoing marks.
    this.config.marks.forEach((mark, i) => {
        const markData = this.marks[i].data;

        //Identify marks which represent ongoing events.
        if (mark.type === 'line') {
            markData.forEach(d => {
                d.ongoing = d.values[0].values.raw[0][this.config.ongo_col];
            });
        }
    });
    drawOngoingMarks.call(this);

    //Annotate time range.
    drawTimeRange.call(this);

    //Draw reference lines.
    drawReferenceLines.call(this);

    //Add circles to beginning and end of lines.
    addStartStopCircles.call(this);

    //Add symbols.
    addSymbols.call(this);

    //Highlight events.
    highlightMarks.call(this);

    //Replace newline characters with html line break entities to cater to Internet Explorer.
    IEsucks.call(this);
}
