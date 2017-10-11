import clone from '../util/clone';

export function syncSettings(settings) {
    const
        populationSettings = clone(settings);

    populationSettings.y.column = populationSettings.id_col;

  //Lines (AE duration)
    populationSettings.marks[0].per = [populationSettings.id_col, populationSettings.event_col, populationSettings.seq_col];
    populationSettings.marks[0].tooltip = `Event: [${populationSettings.event_col}]`
        + `\nStart Day: [${populationSettings.stdy_col}]`
        + `\nStop Day: [${populationSettings.endy_col}]`;

  //Circles (AE start day)
    populationSettings.marks[1].per = [populationSettings.id_col, populationSettings.event_col, populationSettings.seq_col, 'wc_value'];
    populationSettings.marks[1].tooltip = `Event: [${populationSettings.event_col}]`
        + `\nStart Day: [${populationSettings.stdy_col}]`
        + `\nStop Day: [${populationSettings.endy_col}]`;
    populationSettings.marks[1].values = {wc_category: [populationSettings.stdy_col]};

  //Define mark coloring and legend order.
    populationSettings.color_by = populationSettings.event_col;
    populationSettings.color_dom = populationSettings.events;
    populationSettings.colors = populationSettings.colors;
    populationSettings.legend.order = populationSettings.color_dom;

  //Default filters
    const
        defaultFilters = [
            {value_col: populationSettings.event_col, label: 'Event Type'},
            {value_col: populationSettings.id_col, label: 'Participant'}
        ];
    populationSettings.filters = populationSettings.filters instanceof Array && populationSettings.filters.length
        ? defaultFilters.concat(
            populationSettings.filters
                .filter(filter => filter instanceof String || (filter instanceof Object && filter.hasOwnProperty('value_col')))
                .map(filter => {
                    const
                        filterObject = {};
                        filterObject.value_col = filter.value_col || filter;
                        filterObject.label = filter.label || filter.value_col;
                    return filterObject;
                }))
        : defaultFilters;

  //Default details.
    const
        defaultDetails = [
            {value_col: populationSettings.event_col, label: 'Event Type'},
            {value_col: populationSettings.seq_col, label: 'Sequence Number'},
            {value_col: populationSettings.stdy_col, label: 'Start Day'},
            {value_col: populationSettings.endy_col, label: 'Stop Day'}
        ];
    populationSettings.details = populationSettings.details instanceof Array && populationSettings.details.length
        ? defaultDetails.concat(
            populationSettings.details
                .filter(filter => filter instanceof String || (filter instanceof Object && filter.hasOwnProperty('value_col')))
                .map(filter => {
                    const
                        filterObject = {};
                        filterObject.value_col = filter.value_col || filter;
                        filterObject.label = filter.label || filter.value_col;
                    return filterObject;
                }))
        : defaultDetails;

  //Add settings.filters columns to default details.
    populationSettings.filters
        .forEach(filter => {
            const
                filterObject = filter instanceof Object
                    ? filter
                    : {value_col: filter};
                filterObject.label = filterObject.label || filterObject.value_col;

            if (defaultDetails.map(detail => detail.value_col).indexOf(filter.value_col) === -1 && filter.value_col !== populationSettings.id_col)
                defaultDetails.push(
                    {value_col: filter.value_col
                    ,label: filter.label});
        });

  //Redefine settings.details with defaults.
    populationSettings.details = populationSettings.details && populationSettings.details.length
        ? populationSettings.details
            .map(detail => {
                return {
                    value_col: d.value_col ? d.value_col : d,
                    label: d.label ? d.label : d.value_col ? d.value_col : d}; });
        : populationSettings.details = defaultDetails;

      //Add default details to settings.details.
        defaultDetails
            .reverse()
            .forEach(defaultDetail =>
                populationSettings.details.unshift(defaultDetail));
    }

  //Add custom marks to marks array.
    if (populationSettings.custom_marks)
        populationSettings.custom_marks
            .forEach(custom_mark => {
                custom_mark.attributes = custom_mark.attributes || {};
                custom_mark.attributes.class = 'custom';
                populationSettings.marks.push(custom_mark);
            });

    return populationSettings;
}
export function syncSecondSettings(settings) {
    const participantSettings = clone(settings);

    participantSettings.y.column = participantSettings.seq_col;
    participantSettings.y.sort = 'alphabetical-descending';

    participantSettings.marks[0].per = [participantSettings.seq_col];
    participantSettings.marks[1].per = [participantSettings.seq_col, 'wc_value'];

    if (participantSettings.highlight) {
        participantSettings.marks[2].per = [participantSettings.seq_col];
        participantSettings.marks[3].per = [participantSettings.seq_col, 'wc_value'];
    }

    participantSettings.range_band = settings.range_band*2;
    participantSettings.margin = null;
    participantSettings.transitions = false;

    return participantSettings;
}
