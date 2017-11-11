import clone from '../util/clone';
import { merge } from 'd3';
import syncRendererSpecificSettings from './syncSettings/syncRendererSpecificSettings';
import syncWebchartsSettings from './syncSettings/syncWebchartsSettings';

export default function syncSettings(settings) {
    const syncedSettings = clone(settings);

    /**-------------------------------------------------------------------------------------------\
      Renderer-specific settings
    \-------------------------------------------------------------------------------------------**/

    syncRendererSpecificSettings(syncedSettings);

    /**-------------------------------------------------------------------------------------------\
      Standard webcharts settings
    \-------------------------------------------------------------------------------------------**/

    //Y-axis
    syncedSettings.y.column = syncedSettings.id_col;
    syncedSettings.y.grouping = syncedSettings.grouping_initial;

    //Lines
    syncedSettings.marks[0].per = [
        syncedSettings.id_col,
        syncedSettings.event_col,
        syncedSettings.seq_col
    ];

    //Circles
    syncedSettings.marks[1].per = [
        syncedSettings.id_col,
        syncedSettings.event_col,
        syncedSettings.seq_col,
        'wc_value'
    ];

    //Define mark coloring and legend order.
    syncedSettings.color_by = syncedSettings.event_col;

    //Sync bottom margin with y-axis range band.
    syncedSettings.margin.bottom = syncedSettings.margin.top + syncedSettings.range_band;

    //Time scale-related settings
    syncWebchartsSettings(syncedSettings);

    /**-------------------------------------------------------------------------------------------\
      ID timeline settings
    \-------------------------------------------------------------------------------------------**/

    syncedSettings.IDtimelineSettings = clone(syncedSettings);
    syncedSettings.IDtimelineSettings.x.label = '';
    syncedSettings.IDtimelineSettings.y.column = syncedSettings.IDtimelineSettings.seq_col;
    syncedSettings.IDtimelineSettings.y.sort = 'alphabetical-descending';
    syncedSettings.IDtimelineSettings.marks[0].per = [
        syncedSettings.IDtimelineSettings.event_col,
        syncedSettings.IDtimelineSettings.seq_col
    ];
    syncedSettings.IDtimelineSettings.marks[1].per = [
        syncedSettings.IDtimelineSettings.event_col,
        syncedSettings.IDtimelineSettings.seq_col,
        'wc_value'
    ];
    syncedSettings.IDtimelineSettings.range_band = syncedSettings.IDtimelineSettings.range_band / 2;
    syncedSettings.IDtimelineSettings.margin = { left: 25 };

    /**-------------------------------------------------------------------------------------------\
      Listing settings
    \-------------------------------------------------------------------------------------------**/

    syncedSettings.details_config = syncedSettings.details_config || {
        cols: syncedSettings.details.map(detail => detail.value_col),
        headers: syncedSettings.details.map(detail => detail.label)
    };
    if (!syncedSettings.details_config.hasOwnProperty('cols')) {
        syncedSettings.details_config.cols = syncedSettings.details.map(detail => detail.value_col);
        syncedSettings.details_config.headers = syncedSettings.details.map(detail => detail.label);
    }

    return syncedSettings;
}
