import { behavior, select, event } from 'd3';
import updateText from './addText/updateText';
import updateTable from '../drawReferenceTable/updateTable';

export default function addDrag(reference_line) {
    console.log(reference_line);
    const context = this,
        drag = behavior
            .drag()
            .origin(function(d) {
                return d;
            })
            .on('dragstart', function() {
                select(this).classed('poe-active', true);
            })
            .on('drag', function() {
                const x = event.dx,
                    coordinates = {
                        x1: parseInt(reference_line.invisibleLine.attr('x1')) + x,
                        x2: parseInt(reference_line.invisibleLine.attr('x2')) + x
                    };
                reference_line.timepoint = context.config.x_parseFormat(
                    context.x.invert(coordinates.x1)
                );
                reference_line.label = context.config.x_displayFormat(
                    context.x.invert(coordinates.x1)
                );
                reference_line.lineDatum.x1 = coordinates.x1;
                reference_line.lineDatum.x2 = coordinates.x2;
                reference_line.visibleLine.attr(coordinates);
                reference_line.invisibleLine.attr(coordinates);
                updateText.call(context, reference_line);
                updateTable.call(context, reference_line);
            })
            .on('dragend', function() {
                select(this).classed('poe-active', false);
            });

    reference_line.invisibleLine.call(drag);
}
