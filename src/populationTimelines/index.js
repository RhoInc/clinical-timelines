import { createChart } from 'webcharts';
import callbacks from './callbacks/index';
import participantTimeline from './participantTimeline/index';
import listing from './listing/index';

export default function populationTimelines(element, syncedSettings, controls) {
    const
        populationTimelines = createChart(element, syncedSettings.populationSettings, controls);

    for (const callback in callbacks)
        populationTimelines.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    populationTimelines.participantTimeline = participantTimeline(populationTimelines);
    populationTimelines.listing = listing(populationTimelines);

    return populationTimelines;
}
