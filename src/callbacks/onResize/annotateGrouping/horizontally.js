export default function horizontally() {
    this.groupings.forEach(d => {
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
                        dx: -this.margin.left,
                        y: y1,
                        dy: this.y.rangeBand() * 1.75
                    })
                    .text(d.key);
        }
    });
}
