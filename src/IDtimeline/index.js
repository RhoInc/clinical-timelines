import { createChart } from 'webcharts';
import callbacks from './callbacks/index';
import { multiply } from 'webcharts';

export default function IDtimeline(clinicalTimelines) {
    const IDtimeline = createChart(
        clinicalTimelines.rightSide.node(),
        clinicalTimelines.config.IDtimelineSettings
    );

    for (const callback in callbacks)
        IDtimeline.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    IDtimeline.clinicalTimelines = clinicalTimelines;
    multiply(IDtimeline, [], clinicalTimelines.config.event_col);
    IDtimeline.wrap.classed('hidden', true);

    return IDtimeline;
}
