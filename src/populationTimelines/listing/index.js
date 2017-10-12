import { createTable } from 'webcharts';
import callbacks from './callbacks/index';

export default function listing(populationTimelines) {
    const
        listing = createTable(populationTimelines.element, {});

    listing.populationTimelines = populationTimelines;

    for (const callback in callbacks)
        listing.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    return listing;
}
