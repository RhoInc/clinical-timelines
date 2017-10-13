import clone from '../util/clone';

export default function syncSettings(settings) {
    const
        syncedSettings = clone(settings);

    syncedSettings.y.column = syncedSettings.id_col;

  //Lines (events with duration)
    syncedSettings.marks[0].per = [syncedSettings.id_col, syncedSettings.event_col, syncedSettings.seq_col];
    syncedSettings.marks[0].tooltip = `Event: [${syncedSettings.event_col}]`
        + `\nStart Day: [${syncedSettings.stdy_col}]`
        + `\nStop Day: [${syncedSettings.endy_col}]`;

  //Circles (events without duration)
    syncedSettings.marks[1].per = [syncedSettings.id_col, syncedSettings.event_col, syncedSettings.seq_col, 'wc_value'];
    syncedSettings.marks[1].tooltip = `Event: [${syncedSettings.event_col}]`
        + `\nStart Day: [${syncedSettings.stdy_col}]`
        + `\nStop Day: [${syncedSettings.endy_col}]`;
    syncedSettings.marks[1].values = {wc_category: [syncedSettings.stdy_col]};

  //Define mark coloring and legend order.
    syncedSettings.color_by = syncedSettings.event_col;
    syncedSettings.color_dom = syncedSettings.events;
    syncedSettings.legend.order = syncedSettings.color_dom;

  //Default filters
    const
        defaultFilters = [
            {type: 'subsetter', value_col: syncedSettings.id_col, label: 'Participant', multiple: false},
            {type: 'subsetter', value_col: syncedSettings.event_col, label: 'Event Type', multiple: true}
        ];
    syncedSettings.filters = syncedSettings.filters instanceof Array && syncedSettings.filters.length
        ? defaultFilters.concat(
            syncedSettings.filters
                .filter(filter => filter instanceof String || (filter instanceof Object && filter.hasOwnProperty('value_col')))
                .map(filter => {
                    const
                        filterObject = {};
                        filterObject.type = 'subsetter';
                        filterObject.value_col = filter.value_col || filter;
                        filterObject.label = filter.label || filter.value_col;
                        filterObject.multiple = filterObject.multiple === true
                            ? true
                            : false;
                    return filterObject;
                }))
        : defaultFilters;

  //Default details
    const
        defaultDetails = [
            {value_col: syncedSettings.event_col, label: 'Event Type'},
            {value_col: syncedSettings.seq_col, label: 'Sequence Number'},
            {value_col: syncedSettings.stdy_col, label: 'Start Day'},
            {value_col: syncedSettings.endy_col, label: 'Stop Day'}
        ];
    syncedSettings.details = syncedSettings.details instanceof Array && syncedSettings.details.length
        ? defaultDetails.concat(
            syncedSettings.details
                .filter(detail => detail instanceof String || (detail instanceof Object && detail.hasOwnProperty('value_col')))
                .map(detail => {
                    const
                        detailObject = {};
                        detailObject.value_col = detail.value_col || detail;
                        detailObject.label = detail.label || detail.value_col;
                    return detailObject;
                }))
        : defaultDetails;

  //Add settings.filters columns to default details.
    syncedSettings.filters
        .forEach(filter => {
            if (syncedSettings.details.map(detail => detail.value_col).indexOf(filter.value_col) === -1)
                syncedSettings.details.push(filter);
        });

  //Participant timelines settings
    syncedSettings.participantSettings = clone(syncedSettings);
    syncedSettings.participantSettings.y.column = syncedSettings.participantSettings.seq_col;
    syncedSettings.participantSettings.y.sort = 'alphabetical-descending';
    syncedSettings.participantSettings.marks[0].per = [syncedSettings.participantSettings.event_col, syncedSettings.participantSettings.seq_col];
    syncedSettings.participantSettings.marks[1].per = [syncedSettings.participantSettings.event_col, syncedSettings.participantSettings.seq_col, 'wc_value'];
    syncedSettings.participantSettings.margin = null;
    syncedSettings.participantSettings.transitions = false;

    return syncedSettings;
}
