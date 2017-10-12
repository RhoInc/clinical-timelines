export default function syncControls(controls, settings) {
    settings.filters
        .reverse()
        .forEach(filter => {
            filter.type = 'subsetter';
            controls.unshift(filter);
        });
  
    return controls;
}
