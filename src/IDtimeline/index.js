import { createChart } from 'webcharts';
import callbacks from './callbacks/index';

export default function IDtimeline(clinicalTimelines) {
    const IDtimeline = createChart(
        clinicalTimelines.rightSide.node(),
        clinicalTimelines.config.IDsettings
    );

    for (const callback in callbacks)
        IDtimeline.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    IDtimeline.clinicalTimelines = clinicalTimelines;
    IDtimeline.wrap.classed('hidden', true);

    return IDtimeline;
}
