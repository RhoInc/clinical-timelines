export default function addHoverLine(reference_line) {
    reference_line.hoverLine = reference_line.g
        .append('line')
        .datum(reference_line.lineDatum)
        .classed('ct-hover-line', true)
        .attr({
            x1: d => d.x1,
            x2: d => d.x2,
            y1: d => d.y1,
            y2: d => d.y2
        });
}
