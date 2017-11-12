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
    syncRendererSpecificSettings(syncedSettings);
    syncWebchartsSettings(syncedSettings);
    syncTimeScaleSettings(syncedSettings);

    //ID timeline
    syncedSettings.IDtimelineSettings = clone(syncedSettings);
    syncIDtimelineSettings(syncedSettings.IDtimelineSettings);

    //Listing
    syncedSettings.details_config = syncedSettings.details_config || {
        cols: syncedSettings.details.map(detail => detail.value_col),
        headers: syncedSettings.details.map(detail => detail.label)
    };
    syncListingSettings(syncedSettings.details_config);

    return syncedSettings;
}
