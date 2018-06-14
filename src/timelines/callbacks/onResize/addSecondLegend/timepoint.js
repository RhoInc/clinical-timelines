export default function timepoint(legendMark) {
    const x = 1;
    const y = 10;
    const width = 8;
    const height = 8;
    const margin = 2;
    legendMark
        .append('rect')
        .classed('ct-legend-mark', true)
        .attr({
            x: x + width * 0 + margin * 0,
            y: y - height / 2,
            width: width,
            height: height,
            fill: 'black'
        });
    //.append('animateTransform')
    //.attr({
    //    attributeName: 'transform',
    //    type: 'rotate',
    //    from: `0 ${x + width/2} ${y}`,
    //    to: `360 ${x + width/2} ${y}`,
    //    dur: '4s',
    //    repeatCount: 'indefinite'
    //});
    legendMark
        .append('circle')
        .classed('ct-legend-mark', true)
        .attr({
            cx: x + width * 1 + width / 2 + +margin * 1,
            cy: y,
            r: width / 2,
            fill: 'black'
        });
    legendMark
        .append('polygon')
        .classed('ct-legend-mark', true)
        .attr({
            points: [
                [x + width * 2 + margin * 2, y - height / 2],
                [x + width * 2 + margin * 2 + width, y],
                [x + width * 2 + margin * 2, y + height / 2]
            ]
                .map(point => point.join(','))
                .join(','),
            fill: 'black'
        });
    //.append('animateTransform')
    //.attr({
    //    attributeName: 'transform',
    //    type: 'rotate',
    //    from: `0 ${x + width*2 + 2 + width/2} ${y}`,
    //    to: `360 ${x + width*2 + 2 + width/2} ${y}`,
    //    dur: '4s',
    //    repeatCount: 'indefinite'
    //});
}
