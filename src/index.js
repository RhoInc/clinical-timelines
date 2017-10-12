import defineStyles from './util/defineStyles';
import './util/object-assign';
import defaults from './defaults/index';
import { createControls, createChart } from 'webcharts';
import callbacks from './callbacks/index';
import participantTimeline from './participantTimeline/index';
import listing from './listing/index';

export default function clinicalTimelines(element, settings) {
    defineStyles();

    const
        mergedSettings = Object.assign({}, defaults.settings, settings),
        syncedSettings = defaults.syncSettings(mergedSettings),
        syncedControls = defaults.syncControls(defaults.controls, syncedSettings),
        controls = createControls(element, { location: 'top', inputs: syncedControls }),
        clinicalTimelines = createChart(element, syncedSettings, controls);

    for (const callback in callbacks)
        clinicalTimelines.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    clinicalTimelines.element = element;
    clinicalTimelines.participantTimeline = participantTimeline(clinicalTimelines);
    clinicalTimelines.listing = listing(clinicalTimelines);

    return clinicalTimelines;
}
