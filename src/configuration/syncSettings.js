import clone from '../util/clone';
import { merge } from 'd3';
import syncRendererSpecificSettings from './syncSettings/syncRendererSpecificSettings';
import syncWebchartsSettings from './syncSettings/syncWebchartsSettings';
import syncTimeScaleSettings from './syncSettings/syncTimeScaleSettings';
import syncIDtimelineSettings from './syncSettings/syncIDtimelineSettings';
import syncListingSettings from './syncSettings/syncListingSettings';

export default function syncSettings(settings) {
    const syncedSettings = clone(settings);

    //Clinical timelines
    syncTimeScaleSettings(syncedSettings);
    syncRendererSpecificSettings(syncedSettings);
    syncWebchartsSettings(syncedSettings);

    //ID timeline
    syncedSettings.IDtimelineSettings = clone(syncedSettings);
    syncIDtimelineSettings(syncedSettings.IDtimelineSettings);

    //Listing
    syncListingSettings(syncedSettings);

    return syncedSettings;
}
