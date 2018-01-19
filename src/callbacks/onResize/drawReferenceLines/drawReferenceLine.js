import addHover from './drawReferenceLine/addHover';
import addDrag from './drawReferenceLine/addDrag';

export default function drawReferenceLine(reference_line, i) {
    reference_line.g = this.referenceLinesGroup
        .append('g')
        .classed('reference-line', true)
        .attr('id', 'reference-line-' + i);
    reference_line.timepointN = this.config.time_function(reference_line.timepoint);
    (reference_line.lineDatum = {
        x1: this.x(reference_line.timepointN),
        x2: this.x(reference_line.timepointN),
        y1: 0,
        y2:
            this.plot_height +
            (this.config.y.column === this.config.id_col ? this.y.rangeBand() : 0)
    }),
        (reference_line.visibleLine = reference_line.g
            .append('line')
            .datum(reference_line.lineDatum)
            .classed('visible-reference-line', true)
            .attr({
                x1: d => d.x1,
                x2: d => d.x2,
                y1: d => d.y1,
                y2: d => d.y2
            }));
    reference_line.invisibleLine = reference_line.g
        .append('line')
        .datum(reference_line.lineDatum)
        .classed('invisible-reference-line', true)
        .attr({
            x1: d => d.x1,
            x2: d => d.x2,
            y1: d => d.y1,
            y2: d => d.y2
        }); // invisible reference line has no dasharray and is much thicker to make hovering easier
    reference_line.textDirection =
        reference_line.lineDatum.x1 <= this.plot_width / 2 ? 'right' : 'left';
    reference_line.textLabel = reference_line.g
        .append('text')
        .classed('reference-line-label', true)
        .attr({
            x: reference_line.lineDatum.x1,
            'text-anchor': reference_line.textDirection === 'right' ? 'beginning' : 'end',
            dx: reference_line.textDirection === 'right' ? 15 : -15
        })
        .text(reference_line.label);
    reference_line.textDimensions = reference_line.textLabel.node().getBBox();
    reference_line.textBox = reference_line.g
        .insert('rect', '.reference-line-label')
        .classed('reference-line-label-box', true)
        .attr({
            x: reference_line.textDimensions.x - 10,
            width: reference_line.textDimensions.width + 20,
            height: reference_line.textDimensions.height + 8
        });

    //Display reference line label on hover.
    addHover.call(this, reference_line);

    //Make line draggable.
    addDrag.call(this, reference_line);
}
