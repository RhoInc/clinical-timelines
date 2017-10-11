/*------------------------------------------------------------------------------------------------\
  Add highlighted adverse event legend item.
\------------------------------------------------------------------------------------------------*/

export default function addHighlightLegendItem(chart) {
    chart.wrap.select('.legend li.highlight').remove();
    let highlightLegendItem = chart.wrap
        .select('.legend')
        .append('li')
        .attr('class', 'highlight')
        .style({
            'list-style-type': 'none',
            'margin-right': '1em',
            display: 'inline-block'
        });
    let highlightLegendColorBlock = highlightLegendItem
        .append('svg')
        .attr({
            width: '1.75em',
            height: '1.5em'
        })
        .style({
            position: 'relative',
            top: '0.35em'
        });
    highlightLegendColorBlock
        .append('circle')
        .attr({
            cx: 10,
            cy: 10,
            r: 4
        })
        .style(chart.config.highlight.attributes);
    highlightLegendColorBlock
        .append('line')
        .attr({
            x1: 2 * 3.14 * 4 - 10,
            y1: 10,
            x2: 2 * 3.14 * 4 - 5,
            y2: 10
        })
        .style(chart.config.highlight.attributes)
        .style('shape-rendering', 'crispEdges');
    highlightLegendItem
        .append('text')
        .style('margin-left', '.35em')
        .text(chart.config.highlight.label);
}
