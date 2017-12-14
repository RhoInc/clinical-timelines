export default function drawReferenceLines() {
    if (this.config.reference_lines) {
        const context = this;

        //Add group for reference lines.
        this.svg.select('.reference-lines').remove();
        const referenceLinesGroup = this.svg
            .insert('g', '#clinical-timelines .wc-chart .wc-svg .line-supergroup')
            .classed('reference-lines', true);

        //Append reference line for each item in config.reference_lines.
        this.config.reference_lines.forEach((reference_line, i) => {
            const referenceLineGroup = referenceLinesGroup
                    .append('g')
                    .classed('reference-line', true)
                    .attr('id', 'reference-line-' + i),
                visibleReferenceLine = referenceLineGroup
                    .append('line')
                    .classed('visible-reference-line', true)
                    .attr({
                        x1: this.x(reference_line.timepoint),
                        x2: this.x(reference_line.timepoint),
                        y1: 0,
                        y2: this.plot_height + this.y.rangeBand()
                    }),
                invisibleReferenceLine = referenceLineGroup
                    .append('line')
                    .classed('invisible-reference-line', true)
                    .attr({
                        x1: this.x(reference_line.timepoint),
                        x2: this.x(reference_line.timepoint),
                        y1: 0,
                        y2: this.plot_height + this.y.rangeBand()
                    }), // invisible reference line has no dasharray and is much thicker to make hovering easier
                direction =
                    reference_line.timepoint <= (this.x_dom[1] - this.x_dom[0]) / 2
                        ? 'right'
                        : 'left',
                referenceLineLabel = referenceLineGroup
                    .append('text')
                    .classed('reference-line-label', true)
                    .attr({
                        x: this.x(reference_line.timepoint),
                        y: 0,
                        'text-anchor': direction === 'right' ? 'beginning' : 'end',
                        dx: direction === 'right' ? 15 : -15,
                        dy: this.config.range_band * (this.parent ? 1.5 : 1)
                    })
                    .text(reference_line.label),
                dimensions = referenceLineLabel.node().getBBox(),
                referenceLineLabelBox = referenceLineGroup
                    .insert('rect', '.reference-line-label')
                    .classed('reference-line-label-box', true)
                    .attr({
                        x: dimensions.x - 10,
                        y: dimensions.y - 5,
                        width: dimensions.width + 20,
                        height: dimensions.height + 10
                    });

            //Display reference line label on hover.
            invisibleReferenceLine
                .on('mouseover', () => {
                    visibleReferenceLine.classed('hover', true);
                    referenceLineLabel.classed('hidden', false);
                    referenceLineLabelBox.classed('hidden', false);
                    this.svg.node().appendChild(referenceLineLabelBox.node());
                    this.svg.node().appendChild(referenceLineLabel.node());
                })
                .on('mouseout', () => {
                    visibleReferenceLine.classed('hover', false);
                    referenceLineLabel.classed('hidden', true);
                    referenceLineLabelBox.classed('hidden', true);
                    referenceLineGroup.node().appendChild(referenceLineLabelBox.node());
                    referenceLineGroup.node().appendChild(referenceLineLabel.node());
                });

            //Hide reference labels initially.
            referenceLineLabel.classed('hidden', true);
            referenceLineLabelBox.classed('hidden', true);
        });
    }
}
