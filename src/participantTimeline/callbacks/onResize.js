import drawOngoingMarks from '../../callbacks/onResize/drawOngoingMarks';
import drawReferenceLines from '../../callbacks/onResize/drawReferenceLines';

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

    //Draw reference lines.
    if (this.config.reference_lines) drawReferenceLines.call(this);

    //Highlight events
    this.svg
        .selectAll('.wc-data-mark')
        .classed('highlighted', d => d.key.indexOf(this.config.event_highlighted) > -1);
}
