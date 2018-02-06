import './util/array-find';
import './util/object-assign';
import './util/number-isinteger';
import { select } from 'd3';
import defineStyles from './util/defineStyles';
import merge from './util/merge';
import defaults from './defaults/index';
import { createControls, createChart } from 'webcharts';
import callbacks from './callbacks/index';
import clone from './util/clone';
import IDtimeline from './IDtimeline/index';
import listing from './listing/index';

export default function clinicalTimelines(element = 'body', settings) {
    //Define unique div within passed element argument.
    const container = select(element)
            .append('div')
            .attr('id', 'clinical-timelines'),
        leftSide = container.append('div').attr('id', 'left-side'),
        rightSide = container.append('div').attr('id', 'right-side');

    //Define .css styles to avoid requiring a separate .css file.
    defineStyles();

    const mergedSettings = merge({}, defaults.settings, settings),
        syncedSettings = defaults.syncSettings(mergedSettings),
        syncedControls = defaults.syncControls(defaults.controls, syncedSettings),
        controls = createControls(leftSide.node(), { location: 'top', inputs: syncedControls }),
        clinicalTimelines = createChart(rightSide.node(), syncedSettings, controls);

    for (const callback in callbacks)
        clinicalTimelines.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    clinicalTimelines.leftSide = leftSide;
    clinicalTimelines.rightSide = rightSide;
    clinicalTimelines.initialSettings = clone(syncedSettings);
    clinicalTimelines.IDtimeline = IDtimeline(clinicalTimelines);
    clinicalTimelines.listing = listing(clinicalTimelines);

    return clinicalTimelines;
}
