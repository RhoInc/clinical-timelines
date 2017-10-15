import { multiply } from 'webcharts';

export default function drawParticipantTimeline(d) {
    //Update participant filter.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => control.value_col === this.config.id_col)
        .selectAll('option')
        .property('selected', option => option === this.selected_id);
    this.filters.filter(filter => filter.col === this.config.id_col)[0].val = this.selected_id;

    //Hide population details.
    this.populationDetails.wrap.classed('hidden', true);

    //Display participant information.
    this.participantDetails.wrap.classed('hidden', false);
    this.participantDetails.wrap.select('#participant').text(this.selected_id);

    //Display back button.
    this.backButton.classed('hidden', false);

    //Hide clinical timelines.
    this.wrap.classed('hidden', true);

    //Define participant data.
    const longParticipantData = this.raw_data.filter(
            di => di[this.config.id_col] === this.selected_id
        ),
        wideParticipantData = this.wide_data.filter(
            di => di[this.config.id_col] === this.selected_id
        );

    //Draw participant timeline.
    this.participantTimeline.wrap.classed('hidden', false);
    this.participantTimeline.wrap.selectAll('*').remove();
    multiply(this.participantTimeline, longParticipantData, this.config.event_col);

    //Draw participant detail listing.
    this.listing.wrap.classed('hidden', false);
    this.listing.draw(wideParticipantData);
}
