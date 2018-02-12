import { time } from 'd3';
import drawReferenceTable from './drawReferenceLines/drawReferenceTable';

export default function drawReferenceLines() {
    if (this.config.reference_lines) {
        //Remove previously reference lines and tables.
        this.svg.select('.ct-reference-lines').remove();
        this.clinicalTimelines.containers.leftColumn
            .selectAll('.ct-reference-line-label-container')
            .remove();

        //Add group for reference lines.
        const referenceLinesGroup = this.svg
            .insert('g', '#clinical-timelines .wc-chart .wc-svg .line-supergroup')
            .classed('ct-reference-lines', true);

        //Append reference line for each item in config.reference_lines.
        this.config.reference_lines
            .filter(reference_line => reference_line.time_scale === this.config.time_scale)
            .filter(
                reference_line =>
                    this.x_dom[0] <= this.config.time_function(reference_line.timepoint) &&
                    this.x_dom[1] >= this.config.time_function(reference_line.timepoint)
            )
            .forEach((reference_line, i) => {
                const referenceLineGroup = referenceLinesGroup
                    .append('g')
                    .classed('ct-reference-line', true)
                    .attr('id', 'ct-reference-line-' + i);
                const timepoint = this.config.time_function(reference_line.timepoint);
                const x = this.x(timepoint);
                const y2 =
                    this.plot_height +
                    (this.config.y.column === this.config.id_col ? this.y.rangeBand() : 0);
                const visibleReferenceLine = referenceLineGroup
                    .append('line')
                    .classed('ct-visible-reference-line', true)
                    .attr({
                        x1: x,
                        x2: x,
                        y1: 0,
                        y2: y2,
                        'clip-path': `url(#${this.id})`
                    });

                //Invisible reference line has no dasharray and is much thicker to make hovering easier.
                const invisibleReferenceLine = referenceLineGroup
                    .append('line')
                    .classed('ct-invisible-reference-line', true)
                    .attr({
                        x1: x,
                        x2: x,
                        y1: 0,
                        y2: y2,
                        'clip-path': `url(#${this.id})`
                    });
                const direction = x <= this.plot_width / 2 ? 'right' : 'left';
                const referenceLineLabel = referenceLineGroup
                    .append('text')
                    .classed('ct-reference-line-label', true)
                    .attr({
                        x: x,
                        dx: direction === 'right' ? 15 : -15,
                        y: 0,
                        dy: this.config.range_band * (this.parent ? 1.5 : 1),
                        'text-anchor': direction === 'right' ? 'beginning' : 'end',
                        'clip-path': `url(#${this.id})`
                    })
                    .text(reference_line.label);
                const dimensions = referenceLineLabel.node().getBBox();
                const referenceLineLabelBox = referenceLineGroup
                    .insert('rect', '.ct-reference-line-label')
                    .classed('ct-reference-line-label-box', true)
                    .attr({
                        x: dimensions.x - 10,
                        y: dimensions.y - 5,
                        width: dimensions.width + 20,
                        height: dimensions.height + 10,
                        'clip-path': `url(#${this.id})`
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

                //Draw reference line frequency table.
                if (!this.parent) drawReferenceTable.call(this, reference_line);
            });
    }
}
