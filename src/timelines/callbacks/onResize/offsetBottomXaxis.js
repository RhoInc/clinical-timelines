export default function offsetBottomXaxis() {
    if (!this.clinicalTimelines.test) {
        const bottomXaxis = this.svg.select('.x.axis'),
            bottomXaxisTransform = bottomXaxis.attr('transform'),
            bottomXaxisTransformX =
                bottomXaxisTransform.indexOf(',') > -1
                    ? +bottomXaxisTransform.split(',')[0].split('(')[1]
                    : +bottomXaxisTransform.split(' ')[0].split('(')[1],
            bottomXaxisTransformY =
                bottomXaxisTransform.indexOf(',') > -1
                    ? +bottomXaxisTransform.split(',')[1].split(')')[0]
                    : +bottomXaxisTransform.split(' ')[1].split(')')[0],
            bottomXaxisTitle = bottomXaxis.select('.axis-title'),
            bottomXaxisTitleTransform = bottomXaxisTitle.attr('transform'),
            bottomXaxisTitleTransformX =
                bottomXaxisTitleTransform.indexOf(',') > -1
                    ? +bottomXaxisTitleTransform.split(',')[0].split('(')[1]
                    : +bottomXaxisTitleTransform.split(' ')[0].split('(')[1],
            bottomXaxisTitleTransformY =
                bottomXaxisTitleTransform.indexOf(',') > -1
                    ? +bottomXaxisTitleTransform.split(',')[1].split(')')[0]
                    : +bottomXaxisTitleTransform.split(' ')[1].split(')')[0];
        bottomXaxis.attr('transform', `translate(0,${bottomXaxisTransformY + this.y.rangeBand()})`);
        bottomXaxisTitle.attr(
            'transform',
            `translate(${bottomXaxisTitleTransformX},${bottomXaxisTitleTransformY -
                7 * this.margin.bottom / 16})`
        );
    }
}
