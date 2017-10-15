import { createChart } from 'webcharts';
import callbacks from './callbacks/index';

export default function participantTimeline(clinicalTimelines) {
    const participantTimeline = createChart(
        clinicalTimelines.element,
        clinicalTimelines.config.participantSettings
    );

    for (const callback in callbacks)
        participantTimeline.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    participantTimeline.clinicalTimelines = clinicalTimelines;
    participantTimeline.wrap.classed('hidden', true);

    return participantTimeline;
}
