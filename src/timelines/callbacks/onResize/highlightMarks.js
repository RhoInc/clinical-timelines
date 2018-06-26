import { select } from 'd3';

export default function highlightMarks() {
    const context = this;

    //Clear line overlays.
    this.svg.selectAll('.ct-highlight-overlay').remove();

    //Highlight legend.
    this.wrap
        .selectAll('.legend-item')
        .classed('ct-highlighted', d => d.label === this.config.event_highlighted);

    //Select marks.
    const highlightedMarks = this.svg
        .selectAll('.wc-data-mark, .ct-ongoing-event, .ct-custom-mark')
        .classed('ct-highlighted', d => d.key.indexOf(this.config.event_highlighted) > -1)
        .filter(d => d.key.indexOf(this.config.event_highlighted) > -1);

    //Highlight time intervals.
    const timeIntervals = highlightedMarks.filter(function() {
        return this.tagName === 'path' && this.getAttribute('class').indexOf('highlighted') > -1;
    });
    timeIntervals.each(function(d, i) {
        const g = select(this.parentNode);
        const x1 = context.x(context.config.time_function(d.values[0].key));
        const x2 =
            context.x(context.config.time_function(d.values[1].key)) +
            (d.ongoing === 'Y'
                ? context.config.marks.find(mark => mark.type === 'line').attributes[
                      'stroke-width'
                  ] / 2
                : 0);
        const y =
            context.y(
                d.values[0].values.raw[0][
                    context.config.y.column === context.config.id_col
                        ? context.config.id_col
                        : context.config.seq_col
                ]
            ) +
            context.y.rangeBand() / 2;
        const color = context.config.event_highlight_color;
        const line = g
            .append('line')
            .classed('ct-highlight-overlay', true)
            .attr({
                x1: x1,
                x2: x2,
                y1: y,
                y2: y,
                stroke: color
            });
    });

    //Highlight timepoints.
    const timepoints = highlightedMarks.filter(function() {
        return (
            ['circle', 'polygon'].indexOf(this.tagName) > -1 &&
            this.getAttribute('class').indexOf('ct-highlighted') > -1 &&
            this.getAttribute('class').indexOf('ct-hidden') < 0 &&
            this.getAttribute('class').indexOf('ct-ongoing-event') < 0
        );
    });
    timepoints.attr({
        stroke: d => this.colorScale(d.values.raw[0][this.config.event_col]),
        fill: d => this.config.event_highlight_color
    });
}
