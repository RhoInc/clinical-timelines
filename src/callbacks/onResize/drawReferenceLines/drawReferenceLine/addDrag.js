import { behavior, select, event } from 'd3';

export default function addDrag(reference_line) {
    const drag = behavior
        .drag()
        .origin(function(d) {
            console.log(d);
            return d;
        })
        .on('dragstart', function() {
            select(this).classed('poe-active', true);
        })
        .on('drag', function() {
            console.log(event);
            const x = event.dx,
                coordinates = {
                    x1: parseInt(reference_line.invisibleLine.attr('x1')) + x,
                    x2: parseInt(reference_line.invisibleLine.attr('x2')) + x
                };
            reference_line.visibleLine.attr(coordinates);
            reference_line.invisibleLine.attr(coordinates);
            reference_line.textLabel.attr('x', coordinates.x1);
            reference_line.textBox.attr('x', coordinates.x1 - 10);
        })
        .on('dragend', function() {
            select(this).classed('poe-active', false);
        });

    reference_line.invisibleLine.call(drag);
}
