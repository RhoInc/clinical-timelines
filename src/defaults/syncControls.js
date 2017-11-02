export default function syncControls(controls, settings) {
    settings.filters.reverse().forEach(filter => {
        filter.type = 'subsetter';
        filter.description = 'filter' + (filter.label === settings.unitPropCased ? '/view' : '');

        if (filter.value_col === settings.event_col) {
            filter.multiple = true;
            filter.start = settings.eventTypes;
        }

        if ([settings.unitPropCased, 'Site'].indexOf(filter.label) > -1)
            controls.unshift(filter);
        else
            controls.splice(controls.length - 3, 0, filter);
    });

    return controls.reverse();
}
