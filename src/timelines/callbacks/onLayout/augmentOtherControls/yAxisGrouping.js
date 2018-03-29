import { select as d3select } from 'd3';

export default function yAxisGrouping(select, d) {
    const selected = d3select(select).select('option:checked');

    //Update grouping settings.
    if (selected.text() !== 'None') {
        this.config.y.grouping = selected.text();
        this.config.y.groupingLabel = selected.property('label');
    } else {
        delete this.config.y.grouping;
        this.config.y.groupingLabel = 'Event Types';
    }

    //Redraw.
    this.draw();
}
