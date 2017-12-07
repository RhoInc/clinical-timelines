import drawIDtimeline from '../../functions/drawIDtimeline';

export default function eventTypeChange(select, d) {
    const filter = this.filters.filter(filter => filter.col === d.value_col)[0];

    //Re-draw ID timeline if in ID timeline view.
    this.currentEventTypes = filter.val;
    if (this.selected_id) drawIDtimeline.call(this);
}
