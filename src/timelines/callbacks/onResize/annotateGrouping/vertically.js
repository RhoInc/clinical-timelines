export default function vertically() {
    this.groupings.forEach(d => {
        if (d.IDs.length) {
            const nIDs = d.IDs.length,
                firstID = d.IDs[nIDs - 1],
                y1 = this.y(firstID),
                y2 = this.y(d.IDs[0]),
                g = this.svg
                    .append('g')
                    .classed('ct-grouping ct-vertical', true)
                    .attr('id', d.key.replace(/ /g, '-')),
                topBoundary = g
                    .append('line')
                    .classed('ct-boundary ct-horizontal', true)
                    .attr({
                        x1: this.plot_width,
                        x2: this.plot_width + this.margin.right / 8,
                        y1: y1 + (3 * this.y.rangeBand()) / 4,
                        y2: y1 + (3 * this.y.rangeBand()) / 4
                    }),
                span = g
                    .append('line')
                    .classed('ct-boundary ct-vertical', true)
                    .attr({
                        x1: this.plot_width + this.margin.right / 8,
                        x2: this.plot_width + this.margin.right / 8,
                        y1: y1 + (3 * this.y.rangeBand()) / 4,
                        y2: y2 + this.y.rangeBand()
                    }),
                bottomBoundary = g
                    .append('line')
                    .classed('ct-boundary ct-horizontal', true)
                    .attr({
                        x1: this.plot_width,
                        x2: this.plot_width + this.margin.right / 8,
                        y1: y2 + this.y.rangeBand(),
                        y2: y2 + this.y.rangeBand()
                    }),
                annotation = g
                    .append('text')
                    .classed('ct-annotation', true)
                    .attr({
                        x: this.plot_width,
                        dx: (4 * this.margin.right) / 8,
                        y: y1,
                        dy: this.y.rangeBand()
                    })
                    .text(
                        `${
                            this.config.groupings.filter(
                                grouping => grouping.value_col === this.config.y.grouping
                            )[0].label
                        }: ${d.key}`
                    );
        }
    });
}
