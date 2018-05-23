export default function timeInterval(legendMark) {
    legendMark
        .append('line')
        .classed('ct-legend-mark', true)
        .attr({
            x1: 4,
            x2: 26,
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
        .append('circle')
        .classed('ct-legend-mark ct-start-stop-circle', true)
        .attr({
            cx: 25,
            cy: 8,
            r: 2.5,
            fill: 'white',
            stroke: 'lightgray'
        });
}
