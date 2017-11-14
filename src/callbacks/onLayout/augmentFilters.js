import { select } from 'd3';
import IDchange from './augmentFilters/IDchange';
import eventTypeChange from './augmentFilters/eventTypeChange';

export default function augmentFilters() {
    const context = this,
        filters = this.controls.wrap
            .selectAll('.control-group')
            .filter(d => d.type === 'subsetter')
            .classed('ct-filter', true)
            .attr('id', d => d.value_col)
            .classed('ID', d => d.value_col === this.config.id_col);

    //Set to selected event types specified in settings.event_types and handle clinical timelines and ID timeline toggle.
    filters
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
        .on('change', function(d) {
            if (filter.col === this.config.id_col) IDchange.call(context, this, d);
            else if (d.value_col === this.config.event_col) eventTypeChange.call(context, this, d);
        });
}
