import { merge } from 'd3';
import clone from '../util/clone';

export default function syncControls(controls, settings) {
    settings.filters.forEach(filter => {
        filter.type = 'subsetter';
        filter.description = 'filter' + (filter.value_col === settings.id_col ? '/view' : '');

        if (filter.value_col === settings.event_col) {
            filter.multiple = true;
            filter.start = settings.event_types;
        }
    });

    const syncedControls = merge([settings.filters, clone(controls)]);

    return syncedControls;
}
