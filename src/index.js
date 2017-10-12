import './util/object-assign';
import defaults from './defaults/index';
import { createControls } from 'webcharts';
import populationTimelines from './populationTimelines/index';

export default function clinicalTimelines(element, settings) {
    const
        mergedSettings = Object.assign({}, defaults.settings, settings),
        syncedSettings = defaults.syncSettings(mergedSettings),
        syncedControls = syncControls(defaults.controls, syncedSettings),
        controls = createControls(element, { location: 'top', inputs: syncedControls }),
        clinicalTimelines = populationTimelines(element, syncedSettings, controls);

    return clinicalTimelines;
}
