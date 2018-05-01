export default function withoutDates() {
    return {
        time_scale: 'day',
        stdt_col: null,
        endt_col: null,
        details_config: {
            exportable: false // node doesn't handle data exports like the browser does
        }
    };
}
