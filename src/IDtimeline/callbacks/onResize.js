import drawOngoingMarks from '../../callbacks/onResize/drawOngoingMarks';
import drawTimeRange from './onResize/drawTimeRange';
import drawReferenceLines from '../../callbacks/onResize/drawReferenceLines';
import highlightMarks from '../../callbacks/onResize/highlightMarks';
import IEsucks from '../../callbacks/onResize/IEsucks';

export default function onResize() {
    const context = this;

    //Hide legend.
    this.wrap.select('.legend').classed('hidden', true);

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

    //Highlight events.
    highlightMarks.call(this);

    //Replace newline characters with html line break entities to cater to Internet Explorer.
    IEsucks.call(this);
}
