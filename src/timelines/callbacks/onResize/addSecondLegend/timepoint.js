export default function timepoint(legendMark) {
    legendMark
        .append('circle')
        .classed('ct-legend-mark', true)
        .attr({
            cx: 4,
            cy: 7.5,
            r: 4,
            fill: 'black'
        });
    legendMark
        .append('rect')
        .classed('ct-legend-mark', true)
        .attr({
            x: 10,
            y: 3.5,
            width: 8,
            height: 8,
            fill: 'black'
        })
        .append('animateTransform')
        .attr({
            attributeName: 'transform',
            type: 'rotate',
            from: '0 14 7.5',
            to: '360 14 7.5',
            dur: '4s',
            repeatCount: 'indefinite'
        });
    legendMark
        .append('polygon')
        .classed('ct-legend-mark', true)
        .attr({
            points: [[22, 4], [30, 8], [22, 12]].map(point => point.join(',')).join(','),
            fill: 'black'
        })
        .append('animateTransform')
        .attr({
            attributeName: 'transform',
            type: 'rotate',
            from: '0 26 8',
            to: '360 26 8',
            dur: '4s',
            repeatCount: 'indefinite'
        });
}
