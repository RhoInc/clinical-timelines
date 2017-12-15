export default function offsetBottomXaxis() {
    const bottomXaxis = this.svg.select('.x.axis'),
        bottomXaxisTitle = bottomXaxis.select('.axis-title');
    bottomXaxis.attr(
        'transform',
        `translate(0,${+bottomXaxis
            .attr('transform')
            .split(',')[1]
            .split(')')[0] + this.y.rangeBand()})`
    );
    bottomXaxisTitle.attr(
        'transform',
        `translate(
            ${+bottomXaxisTitle
                .attr('transform')
                .split(',')[0]
                .split('(')[1]},
            ${+bottomXaxisTitle
                .attr('transform')
                .split(',')[1]
                .split(')')[0] -
                7 * this.margin.bottom / 16})`
    );
}
