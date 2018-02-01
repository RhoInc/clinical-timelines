export default function horizontally() {
    this.groupings.sort((a, b) => (a.key < b.key ? -1 : 1)).forEach((d, i) => {
        if (d.IDs.length) {
            const nIDs = d.IDs.length,
                firstID = d.IDs[nIDs - 1],
                y1 = this.y(firstID),
                y2 = this.y(d.IDs[0]),
                g = this.svg
                    .append('g')
                    .classed('grouping horizontal', true)
                    .attr('id', d.key.replace(/ /g, '-')),
                annotation = g
                    .append('text')
                    .classed('annotation', true)
                    .attr({
                        x: 0,
                        y: y1,
                        dy: this.y.rangeBand() * 1.25
                    })
                    .text(`${this.config.y.groupingLabel}: ${d.key}`),
                rule = g
                    .append('line')
                    .classed('boundary horizontal', true)
                    .attr({
                        x1: 0,
                        y1: y1 + this.y.rangeBand() / 4,
                        x2: this.plot_width,
                        y2: y1 + this.y.rangeBand() / 4
                    });
        }
    });
}
