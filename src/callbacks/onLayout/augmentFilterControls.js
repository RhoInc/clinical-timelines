import { select } from 'd3';
import toggleView from './toggleView';
import drawIDtimeline from '../functions/drawIDtimeline';

export default function augmentFilterControls() {
    const context = this,
        filters = this.controls.wrap
            .selectAll('.control-group')
            .filter(d => d.type === 'subsetter');

    //Set to selected event types specified in settings.event_types and handle clinical timelines and ID timeline toggle.
    filters
        .classed('ID', d => d.value_col === this.config.id_col)
        //Highlight selected event types in select.
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
                //Re-draw ID timeline if in ID timeline view.
                this.currentEventTypes = filter.val;

                if (this.selected_id) drawIDtimeline.call(this);
            }
        });
}
