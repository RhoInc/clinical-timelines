import drawReferenceLine from './drawReferenceLines/drawReferenceLine';
import drawReferenceTable from './drawReferenceLines/drawReferenceTable';

export default function drawReferenceLines() {
    if (this.config.reference_lines) {
        const context = this;

        //Add group for reference lines.
        this.svg.select('.reference-lines').remove();
        this.leftSide.selectAll('.poe-reference-line-container').remove();
        this.referenceLinesGroup = this.svg
            .insert('g', '#clinical-timelines .wc-chart .wc-svg .line-supergroup')
            .classed('reference-lines', true);

        //Append reference line for each item in config.reference_lines.
        this.config.reference_lines
            .filter(reference_line => reference_line.time_scale === this.config.time_scale)
            .forEach((reference_line, i) => {
                //Draw reference line.
                drawReferenceLine.call(this, reference_line, i);

                //Draw reference line frequency table.
                drawReferenceTable.call(this, reference_line, i);
            });
    }
}
