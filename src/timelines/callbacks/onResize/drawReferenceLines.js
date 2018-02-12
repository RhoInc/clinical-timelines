import drawReferenceLine from './drawReferenceLines/drawReferenceLine';
import drawReferenceTable from './drawReferenceLines/drawReferenceTable';

export default function drawReferenceLines() {
    if (this.config.reference_lines) {
        //Remove previously reference lines and tables.
        this.svg.select('.ct-reference-lines').remove();
        this.clinicalTimelines.containers.leftColumn
            .selectAll('.ct-reference-line-label-container')
            .remove();

        //Add group for reference lines.
        this.svg.select('.ct-reference-lines').remove();
        if (!this.parent)
            this.clinicalTimelines.containers.leftColumn
                .selectAll('.ct-reference-line-table-container')
                .remove();
        this.referenceLinesGroup = this.svg
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
                //Draw reference line.
                drawReferenceLine.call(this, reference_line, i);

                //Draw reference line frequency table.
                if (!this.parent) drawReferenceTable.call(this, reference_line, i);
            });
    }
}
