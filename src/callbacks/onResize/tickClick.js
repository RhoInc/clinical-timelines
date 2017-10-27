import drawParticipantTimeline from '../functions/drawParticipantTimeline';

export default function tickClick() {
    drawParticipantTimeline.call(this);

    //Update participant filter.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => control.value_col === this.config.id_col)
        .selectAll('option')
        .property('selected', option => option === this.selected_id);
    this.filters.filter(filter => filter.col === this.config.id_col)[0].val = this.selected_id;

    //Enable/Disable controls other than Participant and Event Type filters.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => [this.config.unitPropCased, 'Event Type'].indexOf(control.label) === -1)
        .selectAll('select,input')
        .property('disabled', !!this.selected_id);

    //Highlight participant dropdown.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => control.label === 'Participant')
        .style({
            'font-weight': 'bold'
        })
        .transition()
        .delay(500)
        .style({
            'font-weight': 'normal'
        })
        .select('select')
        .node()
        .focus();
}
