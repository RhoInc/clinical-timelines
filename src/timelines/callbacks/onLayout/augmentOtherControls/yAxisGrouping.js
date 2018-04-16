import { select as d3select } from 'd3';

export default function yAxisGrouping(select, d) {
    const groupingLabel = d3select(select)
        .select('option:checked')
        .text();

    //Update grouping settings.
    if (groupingLabel !== 'None') {
        this.config.y.groupingLabel = groupingLabel;
        this.config.y.grouping = this.config.groupings.find(
            grouping => grouping.label === groupingLabel
        ).value_col;
    } else {
        this.config.y.groupingLabel = 'Event Types';
        delete this.config.y.grouping;
    }

    //Redraw.
    this.draw();
}
