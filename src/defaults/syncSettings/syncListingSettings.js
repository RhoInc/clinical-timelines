export default function syncListingSettings(settings) {
    settings.details_config = settings.details_config || {
        cols: settings.details.map(detail => detail.value_col),
        headers: settings.details.map(detail => detail.label)
    };
    //Define listing columns and headers if not already defined.
    if (!settings.hasOwnProperty('cols')) {
        settings.details_config.cols = settings.details.map(detail => detail.value_col);
        settings.details_config.headers = settings.details.map(detail => detail.label);
    }
}
