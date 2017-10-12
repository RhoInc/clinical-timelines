export default function onLayout() {
    const context = this;

    //Add div for population stats.
    this.populationAnnotation = this.wrap
        .select('.legend')
        .append('span')
        .classed('population-status', true);

    //Add top x-axis.
    const
        topXaxis = this.svg
            .append('g')
            .classed('top-x axis linear', true);
        topXaxis
            .append('text')
            .classed('axis-title top', true)
            .text(this.config.x_label);
}
