export default function topXaxis() {
    this.svg
        .append('g')
        .classed('x-top axis linear', true)
        .append('text')
        .classed('axis-title top', true);
}
