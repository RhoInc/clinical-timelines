export default function syncControls(controls, settings) {
    controls
        .filter(control => control.option === 'y.sort')[0]
        .label = `Sort ${settings.unit}s`;

    settings.filters.reverse().forEach(filter => {
        controls.unshift(filter);
    });

    return controls.reverse();
}
