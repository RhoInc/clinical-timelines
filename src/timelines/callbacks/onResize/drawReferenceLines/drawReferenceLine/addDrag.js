import { behavior, select, event } from 'd3';
import updateText from './addText/updateText';
import updateTable from '../drawReferenceTable/updateTable';

export default function addDrag(reference_line) {
    const context = this,
        drag = behavior
            .drag()
            .origin(function(d) {
                return d;
            })
            .on('dragstart', function() {
                select(this).classed('ct-active', true);
            })
            .on('drag', function() {
                const dx = event.dx;

                //Calculate x-coordinate of drag line.
                let x = parseInt(reference_line.hoverLine.attr('x1')) + dx;
                if (x < 0) x = 0;
                if (x > context.plot_width) x = context.plot_width;

                //Invert x-coordinate with x-scale.
                const xInverted = context.x.invert(x);

                //Update reference line datum.
                reference_line.timepoint = context.config.x_parseFormat(xInverted);
                reference_line.label = context.config.x_displayFormat(xInverted);
                reference_line.lineDatum.x1 = x;
                reference_line.lineDatum.x2 = x;
                reference_line.visibleLine.attr({ x1: x, x2: x });
                reference_line.hoverLine.attr({ x1: x, x2: x });

                //Update reference line text label and table.
                updateText.call(context, reference_line);
                updateTable.call(context, reference_line);
            })
            .on('dragend', function() {
                select(this).classed('ct-active', false);
            });

    reference_line.hoverLine.call(drag);
}
