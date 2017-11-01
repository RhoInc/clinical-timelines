export default function syncControls(controls, settings) {
    controls.filter(control => control.option === 'y.sort')[0].label = `Sort ${settings.unit}s`;

    settings.filters.reverse().forEach(filter => {
        filter.type = 'subsetter';
        filter.description = 'filter' + (filter.label === settings.unitPropCased ? '/view' : '');

        if (filter.value_col === settings.event_col) {
            filter.multiple = filter.value_col === settings.event_col;
            filter.start = settings.eventTypes;
        }

        controls.unshift(filter);
    });

    return controls.reverse();
}
