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
            .classed('ID', d => d.value_col === this.config.id_col),
        IDfilter = filters.filter(filter => filter.value_col === this.config.id_col),
        eventTypeFilter = filters.filter(filter => filter.value_col === this.config.event_col);

    IDfilter.select('select').on('change', function(d) {
        IDchange.call(context, this);
    });

    eventTypeFilter.selectAll('select.changer option').property('selected', di => {
        return context.currentEventTypes instanceof Array
            ? context.currentEventTypes.indexOf(di) > -1
            : true;
    });
    eventTypeFilter.select('select').on('change', function(d) {
        eventTypeChange.call(context, this);
    });
}
