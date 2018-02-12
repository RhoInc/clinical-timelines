export default function offsetBottomXaxis() {
    if (!this.clinicalTimelines.test) {
        const //capture x-axis and its translation coordinates
            bottomXaxis = this.svg.select('.x.axis'),
            bottomXaxisTransform = bottomXaxis
                .attr('transform')
                .replace(/^translate\((.*)\)$/, '$1'),
            bottomXaxisTransformCoordinates =
                bottomXaxisTransform.indexOf(',') > -1
                    ? bottomXaxisTransform.split(',')
                    : bottomXaxisTransform.split(' '),
            //capture x-axis title and its translation coordinates
            bottomXaxisTitle = bottomXaxis.select('.axis-title'),
            bottomXaxisTitleTransform = bottomXaxisTitle
                .attr('transform')
                .replace(/^translate\((.*)\)$/, '$1'),
            bottomXaxisTitleTransformCoordinates =
                bottomXaxisTitleTransform.indexOf(',') > -1
                    ? bottomXaxisTitleTransform.split(',')
                    : bottomXaxisTitleTransform.split(' ');

        //offset x-axis
        bottomXaxis.attr(
            'transform',
            `translate(${+bottomXaxisTransformCoordinates[0]},${+bottomXaxisTransformCoordinates[1] +
                this.y.rangeBand()})`
        );

        //offset x-axis title
        bottomXaxisTitle.attr(
            'transform',
            `translate(${+bottomXaxisTitleTransformCoordinates[0]},${+bottomXaxisTitleTransformCoordinates[1] -
                7 * this.margin.bottom / 16})`
        );
    }
}
