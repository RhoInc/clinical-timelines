export default function onResize() {
    const context = this;

    //Hide legend.
    this.wrap.select('.legend').classed('hidden', true);
}
