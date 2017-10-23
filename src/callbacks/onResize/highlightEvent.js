export default function highlightEvent() {
    this.wrap
        .selectAll('.legend-item')
        .classed('highlighted', d => d.label === this.config.highlightedEvent);
    this.svg
        .selectAll('.wc-data-mark')
        .classed('highlighted', d => d.key.indexOf(this.config.highlightedEvent) > -1);
}
