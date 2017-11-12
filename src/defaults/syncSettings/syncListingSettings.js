export default function syncListingSettings(settings) {
    //Define listing columns and headers if not already defined.
    if (!settings.hasOwnProperty('cols')) {
        settings.cols = syncedSettings.details.map(detail => detail.value_col);
        settings.headers = syncedSettings.details.map(detail => detail.label);
    }
}
