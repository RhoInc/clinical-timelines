import drawParticipantTimeline from '../functions/drawParticipantTimeline';

export default function toggleView() {
    this.selected_id = this.filters.filter(filter => filter.col === this.config.id_col)[0].val;

    if (this.selected_id !== 'All') {
        drawParticipantTimeline.call(this);
    } else {
        delete this.selected_id;

        //Display population details.
        this.populationDetails.wrap.classed('hidden', false);

        //Hide participant information.
        this.participantDetails.wrap.classed('hidden', true);
        this.participantDetails.wrap.select('#participant').text('');

        //Display back button.
        this.backButton.classed('hidden', true);

        //Hide clinical timelines.
        this.wrap.classed('hidden', false);
        this.draw();

        //Hide participant timeline.
        this.participantTimeline.wrap.selectAll('*').remove();
        this.participantTimeline.wrap.classed('hidden', true);

        //Draw participant detail listing.
        this.listing.draw([]);
        this.listing.wrap.classed('hidden', true);
    }

    //Enable/Disable controls other than Participant and Event Type filters.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => [this.config.unitPropCased, 'Event Type'].indexOf(control.label) === -1)
        .selectAll('select,input')
        .property('disabled', !!this.selected_id);
}
