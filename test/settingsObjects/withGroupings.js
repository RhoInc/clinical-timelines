export default function withGroupings() {
    return {
        groupings: [
            'ARM',
            'SITEID',
        ],
        details_config: {
            exportable: false // node doesn't handle data exports like the browser does
        }
    };
}
