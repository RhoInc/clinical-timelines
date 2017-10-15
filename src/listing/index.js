import { createTable } from 'webcharts';
import callbacks from './callbacks/index';

export default function listing(clinicalTimelines) {
    const listing = createTable(clinicalTimelines.element, {
        cols: clinicalTimelines.config.details.map(d => d.value_col),
        headers: clinicalTimelines.config.details.map(d => d.label)
    });

    for (const callback in callbacks)
        listing.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    listing.clinicalTimelines = clinicalTimelines;
    listing.init([]);
    listing.wrap.classed('hidden', true);

    return listing;
}
