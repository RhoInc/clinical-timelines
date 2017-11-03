import { select } from 'd3';
import defineStyles from './util/defineStyles';
import clone from './util/clone';
import './util/object-assign';
import defaults from './defaults/index';
import { createControls, createChart } from 'webcharts';
import callbacks from './callbacks/index';
import participantTimeline from './participantTimeline/index';
import listing from './listing/index';

export default function clinicalTimelines(element = 'body', settings) {
    //Define unique div within passed element argument.
    const container = select(element)
            .append('div')
            .attr('id', 'clinical-timelines'),
        containerElement = container.node();

    //Define .css styles to avoid requiring a separate .css file.
    defineStyles();

    const mergedSettings = Object.assign({}, defaults.settings, settings),
        syncedSettings = defaults.syncSettings(mergedSettings),
        syncedControls = defaults.syncControls(defaults.controls, syncedSettings),
        controls = createControls(containerElement, { location: 'top', inputs: syncedControls }),
        clinicalTimelines = createChart(containerElement, syncedSettings, controls);

    for (const callback in callbacks)
        clinicalTimelines.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    clinicalTimelines.element = containerElement;
    clinicalTimelines.initialSettings = clone(syncedSettings);
    clinicalTimelines.participantTimeline = participantTimeline(clinicalTimelines);
    clinicalTimelines.listing = listing(clinicalTimelines);

    return clinicalTimelines;
}
