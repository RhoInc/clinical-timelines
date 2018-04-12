export default function withoutDays() {
    return {
        time_scale: 'date',
        stdy_col: null,
        endy_col: null,
        details_config: {
            exportable: false // node doesn't handle data exports like the browser does
        }
    };
}
