import { time } from 'd3';

export default function drawReferenceLines() {
    if (this.config.reference_lines) {
        const context = this;

        //Add group for reference lines.
        this.svg.select('.ct-reference-lines').remove();
        const referenceLinesGroup = this.svg
            .insert('g', '#clinical-timelines .wc-chart .wc-svg .line-supergroup')
            .classed('ct-reference-lines', true);

        //Append reference line for each item in config.reference_lines.
        this.config.reference_lines
            .filter(reference_line => reference_line.time_scale === this.config.time_scale)
            .forEach((reference_line, i) => {
                const referenceLineGroup = referenceLinesGroup
                        .append('g')
                        .classed('ct-reference-line', true)
                        .attr('id', 'reference-line-' + i),
                    timepoint = this.config.time_function(reference_line.timepoint);

                if (this.x_dom[0] <= timepoint && timepoint <= this.x_dom[1]) {
                    const x = this.x(timepoint),
                        y2 =
                            this.plot_height +
                            (this.config.y.column === this.config.id_col ? this.y.rangeBand() : 0),
                        visibleReferenceLine = referenceLineGroup
                            .append('line')
                            .classed('ct-visible-reference-line', true)
                            .attr({
                                x1: x,
                                x2: x,
                                y1: 0,
                                y2: y2
                            }),
                        invisibleReferenceLine = referenceLineGroup
                            .append('line')
                            .classed('ct-invisible-reference-line', true)
                            .attr({
                                x1: x,
                                x2: x,
                                y1: 0,
                                y2: y2
                            }), // invisible reference line has no dasharray and is much thicker to make hovering easier
                        direction = x <= this.plot_width / 2 ? 'right' : 'left',
                        referenceLineLabel = referenceLineGroup
                            .append('text')
                            .classed('ct-reference-line-label', true)
                            .attr({
                                x: x,
                                y: 0,
                                'text-anchor': direction === 'right' ? 'beginning' : 'end',
                                dx: direction === 'right' ? 15 : -15,
                                dy: this.config.range_band * (this.parent ? 1.5 : 1)
                            })
                            .text(reference_line.label),
                        dimensions = referenceLineLabel.node().getBBox(),
                        referenceLineLabelBox = referenceLineGroup
                            .insert('rect', '.ct-reference-line-label')
                            .classed('ct-reference-line-label-box', true)
                            .attr({
                                x: dimensions.x - 10,
                                y: dimensions.y - 5,
                                width: dimensions.width + 20,
                                height: dimensions.height + 10
                            });

                    //Display reference line label on hover.
                    invisibleReferenceLine
                        .on('mouseover', () => {
                            visibleReferenceLine.classed('ct-hover', true);
                            referenceLineLabel.classed('ct-hidden', false);
                            referenceLineLabelBox.classed('ct-hidden', false);
                            this.svg.node().appendChild(referenceLineLabelBox.node());
                            this.svg.node().appendChild(referenceLineLabel.node());
                        })
                        .on('mouseout', () => {
                            visibleReferenceLine.classed('ct-hover', false);
                            referenceLineLabel.classed('ct-hidden', true);
                            referenceLineLabelBox.classed('ct-hidden', true);
                            referenceLineGroup.node().appendChild(referenceLineLabelBox.node());
                            referenceLineGroup.node().appendChild(referenceLineLabel.node());
                        });

                    //Hide reference labels initially.
                    referenceLineLabel.classed('ct-hidden', true);
                    referenceLineLabelBox.classed('ct-hidden', true);
                }
            });
    }
}
