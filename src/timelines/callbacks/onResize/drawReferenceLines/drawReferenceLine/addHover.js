import { mouse as d3mouse } from 'd3';

export default function addHover(reference_line) {
    const context = this;

    //Hide reference labels initially.
    reference_line.text.classed('ct-hidden', true);

    //Add event listeners to invisible reference line.
    reference_line.invisibleLine
        .on('mouseover', function() {
            const mouse = d3mouse(this);
            reference_line.visibleLine.classed('ct-hover', true);
            reference_line.text.classed('ct-hidden', false).attr('y', mouse[1]);
            context.svg.node().appendChild(reference_line.text.node());
        })
        .on('mouseout', () => {
            reference_line.visibleLine.classed('ct-hover', false);
            reference_line.text.classed('ct-hidden', true);
        });
}
