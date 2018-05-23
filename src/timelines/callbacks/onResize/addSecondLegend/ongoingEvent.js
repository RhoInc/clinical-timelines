export default function ongoingEvent(legendMark) {
    legendMark
        .append('line')
        .classed('ct-legend-mark', true)
        .attr({
            x1: 4,
            x2: 20,
            y1: 8,
            y2: 8
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
            cy: 8,
            r: 2.5,
            fill: 'white',
            stroke: 'lightgray'
        });
    legendMark
        .append('polygon')
        .classed('ct-legend-mark ct-ongoing-event', true)
        .attr({
            points: [[18, 2], [30, 7.5], [18, 13]].map(point => point.join(',')).join(' '),
            fill: 'black',
            stroke: 'black'
        });
}
