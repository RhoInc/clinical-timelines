export default function onLayout() {
    const context = this;

    //Add div for population stats.
    this.sample_population.annotation = this.wrap
        .select('.legend')
        .append('span')
        .classed('sample-population', true);

    //Add top x-axis.
    const
        topXaxis = this.svg
            .append('g')
            .classed('x-top axis linear', true);
        topXaxis
            .append('text')
            .classed('axis-title top', true)
            .text(this.config.x_label);
}
