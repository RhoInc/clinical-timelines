import { createTable } from 'webcharts';
import callbacks from './callbacks/index';

export default function listing(clinicalTimelines) {
    const listing = createTable(clinicalTimelines.element, clinicalTimelines.config.listingConfig);

    for (const callback in callbacks)
        listing.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    listing.clinicalTimelines = clinicalTimelines;
    listing.init([]);
    listing.wrap.classed('hidden', true);

    return listing;
}
