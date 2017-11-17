import drawParticipantTimeline from '../functions/drawParticipantTimeline';
import enableDisableControls from '../functions/enableDisableControls';

export default function toggleView() {
    if (this.selected_id && this.selected_id !== 'All') {
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

    enableDisableControls.call(this);
}
