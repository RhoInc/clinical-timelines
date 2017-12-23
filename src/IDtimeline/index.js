import { createChart, multiply } from 'webcharts';
import callbacks from './callbacks/index';

export default function IDtimeline(clinicalTimelines) {
    const IDtimeline = createChart(
            clinicalTimelines.rightSide.node(),
            clinicalTimelines.config.IDtimelineSettings
        ),
        dummyDatum = {
            wc_category: null,
            wc_value: null
        };

    dummyDatum[clinicalTimelines.config.id_col] = null;
    dummyDatum[clinicalTimelines.config.event_col] = null;
    dummyDatum[clinicalTimelines.config.seq_col] = null;

    multiply(
        IDtimeline,
        [dummyDatum],
        clinicalTimelines.config.event_col,
        null,
        clinicalTimelines.test
    );

    for (const callback in callbacks)
        IDtimeline.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    IDtimeline.clinicalTimelines = clinicalTimelines;
    IDtimeline.wrap.classed('hidden', true);

    return IDtimeline;
}
