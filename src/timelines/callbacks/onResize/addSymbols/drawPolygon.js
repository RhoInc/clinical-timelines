import { select } from 'd3';

export default function drawPolygon(marks, event_symbol) {
    const context = this;

    marks.each(function(d) {
        const g = d3.select(this);

        //clear out g
        g.select('circle').classed('ct-hidden', true);
        g.select('polygon.ct-custom-mark').remove();

        //define vertices
        let vertices;
        if (event_symbol.symbol === 'square')
            vertices = [
                [d.symbolCoordinates.x1, d.symbolCoordinates.y1],
                [d.symbolCoordinates.x1, d.symbolCoordinates.y3],
                [d.symbolCoordinates.x3, d.symbolCoordinates.y3],
                [d.symbolCoordinates.x3, d.symbolCoordinates.y1]
            ];
        else if (event_symbol.symbol === 'diamond')
            vertices = [
                [d.symbolCoordinates.x1, d.symbolCoordinates.y2],
                [d.symbolCoordinates.x2, d.symbolCoordinates.y3],
                [d.symbolCoordinates.x3, d.symbolCoordinates.y2],
                [d.symbolCoordinates.x2, d.symbolCoordinates.y1]
            ];
        else if (event_symbol.symbol === 'triangle') {
            if (event_symbol.direction === 'right')
                vertices = [
                    [d.symbolCoordinates.x1, d.symbolCoordinates.y1],
                    [d.symbolCoordinates.x3, d.symbolCoordinates.y2],
                    [d.symbolCoordinates.x1, d.symbolCoordinates.y3]
                ];
            else if (event_symbol.direction === 'down')
                vertices = [
                    [d.symbolCoordinates.x1, d.symbolCoordinates.y1],
                    [d.symbolCoordinates.x3, d.symbolCoordinates.y1],
                    [d.symbolCoordinates.x2, d.symbolCoordinates.y3]
                ];
            else if (event_symbol.direction === 'left')
                vertices = [
                    [d.symbolCoordinates.x3, d.symbolCoordinates.y1],
                    [d.symbolCoordinates.x1, d.symbolCoordinates.y2],
                    [d.symbolCoordinates.x3, d.symbolCoordinates.y3]
                ];
            else
                vertices = [
                    [d.symbolCoordinates.x2, d.symbolCoordinates.y1],
                    [d.symbolCoordinates.x3, d.symbolCoordinates.y3],
                    [d.symbolCoordinates.x1, d.symbolCoordinates.y3]
                ];
        }

        //draw polygon
        const polygon = g
            .append('polygon')
            .datum(d)
            .classed('ct-custom-mark', true)
            .attr({
                points: vertices.map(vertex => vertex.join(',')).join(' '),
                fill: d.color,
                'clip-path': d.key && d.values ? `url(#${context.id})` : null
            });
    });
}
