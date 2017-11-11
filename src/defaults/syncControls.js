import { merge } from 'd3';
import clone from '../util/clone';

export default function syncControls(controls, settings) {
    settings.filters
        .sort((a, b) => (a.value_col === settings.event_col ? 1 : 0))
        .forEach(filter => {
            filter.type = 'subsetter';
            filter.description = filter.label;
            filter.label = '';

            if (filter.value_col === settings.id_col) {
                filter.label = '';
                filter.description = settings.id_unitPropCased + ' view';
            }

            if (filter.value_col === settings.event_col) {
                filter.multiple = true;
                filter.start = settings.event_types;
            }
        });

    const syncedControls = merge([
        [settings.filters[0]], // ID dropdown first
        clone(controls), // Non-filters second
        settings.filters.slice(1) // Filters last
    ]);

    return syncedControls;
}
