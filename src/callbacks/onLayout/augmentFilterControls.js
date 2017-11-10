import { select } from 'd3';
import toggleView from './toggleView';
import drawParticipantTimeline from '../functions/drawParticipantTimeline';

export default function augmentFilterControls() {
    const context = this,
        filters = this.controls.wrap
            .selectAll('.control-group')
            .filter(d => d.type === 'subsetter');

    //Set to selected event types specified in settings.event_types and handle clinical timelines and participant timeline toggle.
    filters
        //Highlight selectecd event types in select.
        .each(function(d) {
            if (d.value_col === context.config.event_col)
                select(this)
                    .selectAll('option')
                    .property('selected', di => {
                        return context.currentEventTypes instanceof Array
                            ? context.currentEventTypes.indexOf(di) > -1
                            : true;
                    });
        })
        .on('change', d => {
            const filter = this.filters.filter(filter => filter.col === d.value_col)[0];

            //Update currently selected ID and toggle view.
            if (filter.col === this.config.id_col) {
                this.selected_id = filter.val !== 'All' ? filter.val : null;
                toggleView.call(this);
            } else if (d.value_col === this.config.event_col) {
                //Re-draw participant timeline if in participant timeline view.
                this.currentEventTypes = filter.val;

                if (this.selected_id) drawParticipantTimeline.call(this);
            }
        });
}
