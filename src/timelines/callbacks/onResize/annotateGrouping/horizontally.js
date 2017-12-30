export default function horizontally() {
    this.groupings.sort((a, b) => (a.key < b.key ? -1 : 1)).forEach((d, i) => {
        if (d.IDs.length) {
            const nIDs = d.IDs.length,
                firstID = d.IDs[nIDs - 1],
                y1 = this.y(firstID),
                y2 = this.y(d.IDs[0]),
                g = this.svg
                    .append('g')
                    .classed('ct-grouping ct-horizontal', true)
                    .attr('id', d.key.replace(/ /g, '-')),
                annotation = g
                    .append('text')
                    .classed('ct-annotation', true)
                    .attr({
                        x: 0,
                        y: y1,
                        dy: this.y.rangeBand() * 1.25
                    })
                    .text(
                        `${this.config.groupings.filter(
                            grouping => grouping.value_col === this.config.y.grouping
                        )[0].label}: ${d.key}`
                    ),
                rule = g
                    .append('line')
                    .classed('ct-boundary ct-horizontal', true)
                    .attr({
                        x1: 0,
                        y1: y1 + this.y.rangeBand() / 4,
                        x2: this.plot_width,
                        y2: y1 + this.y.rangeBand() / 4
                    });
        }
    });
}
