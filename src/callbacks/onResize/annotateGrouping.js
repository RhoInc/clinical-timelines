export default function annotateGrouping() {
    const context = this;

    this.groupings.forEach(d => {
        if (d.IDs.length) {
            const nIDs = d.IDs.length,
                firstID = d.IDs[nIDs - 1],
                y1 = this.y(firstID),
                y2 = this.y(d.IDs[0]),
                g = this.svg
                    .append('g')
                    .classed('grouping', true)
                    .attr('id', d.key.replace(/ /g, '-')),
                boundary = g
                    .append('line')
                    .classed('boundary horizontal', true)
                    .attr({
                        x1: this.plot_width + this.margin.right / 8,
                        x2: this.plot_width + this.margin.right,
                        y1: y1,
                        y2: y1
                    }),
                span = g
                    .append('line')
                    .classed('boundary vertical', true)
                    .attr({
                        x1: this.plot_width + this.margin.right / 8,
                        x2: this.plot_width + this.margin.right / 8,
                        y1: y1,
                        y2: y2 + this.y.rangeBand()
                    }),
                annotation = g
                    .append('text')
                    .classed('annotation', true)
                    .attr({
                        x: this.plot_width,
                        dx: 5 * this.margin.right / 8,
                        y: y1,
                        dy: this.y.rangeBand() / 4
                    })
                    .text(d.key);
        }
    });
}
