import drawOngoingMarks from '../../callbacks/onResize/drawOngoingMarks';
import drawReferenceLines from '../../callbacks/onResize/drawReferenceLines';
import { select } from 'd3';

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
    drawReferenceLines.call(this);

    //Highlight marks.
    this.svg.selectAll('.highlight-overlay').remove();
    this.svg
        .selectAll('.wc-data-mark, .ongoing-event')
        .classed('highlighted', d => d.key.indexOf(this.parent.config.event_highlighted) > -1)
        .filter(function() {
            return (
                this.tagName === 'path' && this.getAttribute('class').indexOf('highlighted') > -1
            );
        })
        .each(function(d) {
            const g = select(this.parentNode),
                line = g
                    .append('line')
                    .classed('highlight-overlay', true)
                    .attr({
                        x1: context.x(
                            context.config.time_scale === 'Study Day'
                                ? +d.values[0].key
                                : new Date(d.values[0].key)
                        ),
                        x2: context.x(
                            context.config.time_scale === 'Study Day'
                                ? +d.values[1].key
                                : new Date(d.values[1].key)
                        ),
                        y1:
                            context.y(d.values[0].values.raw[0][context.config.seq_col]) +
                            context.y.rangeBand() / 2,
                        y2:
                            context.y(d.values[0].values.raw[0][context.config.seq_col]) +
                            context.y.rangeBand() / 2,
                        stroke: context.colorScale(
                            d.values[0].values.raw[0][context.config.event_col]
                        )
                    });
        });
}
