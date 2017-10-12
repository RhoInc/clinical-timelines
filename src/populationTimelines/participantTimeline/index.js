import { createChart } from 'webcharts';
import callbacks from './callbacks/index';

export default function participantTimeline(populationTimelines) {
    const
        participantTimeline = createChart(populationTimelines.element, populationTimelines.syncedSettings.participantSettings);

    participantTimelines.populationTimelines = populationTimelines;

    for (const callback in callbacks)
        participantTimeline.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    return participantTimeline;
}
