import { select } from 'd3';
import { multiply } from 'webcharts';

export default function drawParticipantTimeline() {
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

    //Draw row identifier characteristics.
    if (this.config.id_characteristics)
        this.participantDetails.wrap.selectAll('div.characteristic').each(function(d) {
            select(this)
                .select('span')
                .text(wideParticipantData[0][d.value_col]);
        });

    //Draw participant timeline.
    this.participantTimeline.wrap.classed('hidden', false);
    this.participantTimeline.wrap.selectAll('*').remove();
    multiply(
        this.participantTimeline,
        longParticipantData.filter(
            d =>
                this.currentEventTypes !== 'All'
                    ? this.currentEventTypes.indexOf(d[this.config.event_col]) > -1
                    : true
        ),
        this.config.event_col
    );

    //Draw participant detail listing.
    this.listing.wrap.classed('hidden', false);
    this.listing.draw(
        wideParticipantData.filter(
            d =>
                this.currentEventTypes !== 'All'
                    ? this.currentEventTypes.indexOf(d[this.config.event_col]) > -1
                    : true
        )
    );
}
