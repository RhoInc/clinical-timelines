import addVisibleLine from './drawReferenceLine/addVisibleLine';
import addHoverLine from './drawReferenceLine/addHoverLine';
import addText from './drawReferenceLine/addText';
import addHover from './drawReferenceLine/addHover';
import addDrag from './drawReferenceLine/addDrag';

export default function drawReferenceLine(reference_line, i) {
    reference_line.g = this.referenceLinesGroup
        .append('g')
        .classed('ct-reference-line', true)
        .attr('id', 'ct-reference-line-' + i);
    reference_line.timepointN = this.config.time_function(reference_line.timepoint);
    reference_line.lineDatum = {
        x1: this.x(reference_line.timepointN),
        x2: this.x(reference_line.timepointN),
        y1: 0,
        y2:
            this.plot_height +
            (this.config.y.column === this.config.id_col ? this.y.rangeBand() : 0)
    };

    //Visible reference line, drawn between the overlay and the marks
    addVisibleLine.call(this, reference_line);

    //Invisible reference line, without a dasharray and much thicker to make hovering easier
    addHoverLine.call(this, reference_line);

    //Reference line text label
    addText.call(this, reference_line);

    //Display reference line label on hover.
    addHover.call(this, reference_line);

    //Make line draggable.
    if (!this.parent) addDrag.call(this, reference_line);
}
