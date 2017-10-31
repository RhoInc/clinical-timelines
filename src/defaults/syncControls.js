export default function syncControls(controls, settings) {
    settings.filters.reverse().forEach(filter => {
        if ([settings.unitPropCased, 'Site'].indexOf(filter.label) > -1) controls.unshift(filter);
        else controls.splice(controls.length - 3, 0, filter);
    });

    return controls.reverse();
}
