export default function addHover(reference_line) {
    const context = this;

    //Hide reference labels initially.
    reference_line.textLabel.classed('hidden', true);
    reference_line.textBox.classed('hidden', true);

    //Add event listeners to invisible reference line.
    reference_line.invisibleLine
        .on('click', function() {
            const mouse = d3.mouse(this);
        })
        .on('mouseover', function() {
            const mouse = d3.mouse(this);
            reference_line.visibleLine.classed('hover', true);
            reference_line.textLabel.classed('hidden', false).attr('y', mouse[1]);
            reference_line.textBox
                .classed('hidden', false)
                .attr('y', mouse[1] - reference_line.textDimensions.height);
            context.svg.node().appendChild(reference_line.textBox.node());
            context.svg.node().appendChild(reference_line.textLabel.node());
        })
        .on('mouseout', () => {
            reference_line.visibleLine.classed('hover', false);
            reference_line.textLabel.classed('hidden', true);
            reference_line.textBox.classed('hidden', true);
        });
}
