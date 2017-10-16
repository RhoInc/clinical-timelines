import { multiply } from 'webcharts';

export default function drawParticipantTimeline() {
    this.selected_id = this.filters.filter(filter => filter.col === this.config.id_col)[0].val;

    if (this.selected_id !== 'All') {
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
                di =>
                    di[this.config.id_col] === this.selected_id &&
                    (this.currentEventTypes !== 'All'
                        ? this.currentEventTypes.indexOf(di[this.config.event_col]) > -1
                        : true)
            ),
            wideParticipantData = this.wide_data.filter(
                di =>
                    di[this.config.id_col] === this.selected_id &&
                    (this.currentEventTypes !== 'All'
                        ? this.currentEventTypes.indexOf(di[this.config.event_col]) > -1
                        : true)
            );

        //Draw participant timeline.
        this.participantTimeline.wrap.classed('hidden', false);
        this.participantTimeline.wrap.selectAll('*').remove();
        multiply(this.participantTimeline, longParticipantData, this.config.event_col);

        //Draw participant detail listing.
        this.listing.wrap.classed('hidden', false);
        this.listing.draw(wideParticipantData);
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

    //Enable/Disable participant sort.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => control.label === 'Sort participants')
        .selectAll('.radio input')
        .property('disabled', !!this.selected_id);
}
