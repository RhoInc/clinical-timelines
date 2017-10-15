export default function backButton() {
    delete this.selected_id;

    //Update participant filter.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => control.value_col === this.config.id_col)
        .selectAll('option')
        .property('selected', option => option === 'All');
    this.filters.filter(filter => filter.col === this.config.id_col)[0].val = 'All';

    //Hide participant timelines.
    this.participantDetails.wrap.classed('hidden', true);
    this.participantTimeline.wrap.classed('hidden', true);
    this.listing.wrap.classed('hidden', true);
    this.backButton.classed('hidden', true);

    //Display population timelines.
    this.populationDetails.wrap.classed('hidden', false);
    this.wrap.classed('hidden', false);

    //Redraw clinical timelines.
    this.draw();
}
