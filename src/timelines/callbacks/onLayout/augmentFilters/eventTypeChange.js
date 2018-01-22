import { select as d3select } from 'd3';
import drawIDtimeline from '../../functions/drawIDtimeline';

export default function eventTypeChange(select) {
    this.currentEventTypes = d3select(select)
        .selectAll('select option:checked')
        .pop()
        .map(d => d.textContent);
    this.filters.filter(
        filter => filter.col === this.config.event_col
    )[0].val = this.currentEventTypes;
    this.wrap
        .selectAll('.legend-item')
        .classed('ct-selected', d => this.currentEventTypes.indexOf(d.label) > -1);

    if (this.selected_id) drawIDtimeline.call(this);
    else this.draw();
}
