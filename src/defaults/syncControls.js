export default function syncControls(controls, settings) {
    settings.filters
        .reverse()
        .forEach(filter => {
            controls.unshift(filter);
        });
  
    return controls;
}
