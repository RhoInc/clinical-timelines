export default function ongoingEvent(legendMark) {
    const y = 10;
    legendMark
        .append('line')
        .classed('ct-legend-mark', true)
        .attr({
            x1: 4,
            x2: 20,
            y1: y,
            y2: y
        })
        .style({
            'stroke-width': 8,
            stroke: 'black',
            'stroke-linecap': 'round'
        });
    legendMark
        .append('circle')
        .classed('ct-legend-mark ct-start-stop-circle', true)
        .attr({
            cx: 5,
            cy: y,
            r: 2.5,
            fill: 'white',
            stroke: 'lightgray'
        });
    legendMark
        .append('polygon')
        .classed('ct-legend-mark ct-ongoing-event', true)
        .attr({
            points: [[18, y - 6], [30, y], [18, y + 6]].map(point => point.join(',')).join(' '),
            fill: 'black',
            stroke: 'black'
        });
}
