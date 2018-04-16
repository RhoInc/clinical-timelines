import drawIDtimeline from '../timelines/callbacks/functions/drawIDtimeline';

export default function selectAllEventTypes() {
    this.timelines.currentEventTypes = [];

    //Update event type filter.
    this.timelines.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.value_col === this.settings.event_col)
        .selectAll('.changer option')
        .property('selected', false);

    //Update event type filter object.
    this.timelines.filters.filter(filter => filter.col === this.settings.event_col)[0].val = [];

    //Update legend items.
    this.timelines.wrap.selectAll('.legend-item').classed('ct-selected', false);

    //Draw chart.
    if (this.timelines.selected_id) drawIDtimeline.call(this.timelines);
    else this.timelines.draw();
}
