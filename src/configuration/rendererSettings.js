export default function rendererSettings() {
    return {
        // ID settings
        id_col: 'USUBJID',
        id_unit: 'participant',
        id_characteristics: null,

        // event settings
        event_col: 'DOMAIN',
        event_types: null,
        event_highlighted: null,
        event_highlight_color: 'black',
        event_symbols: null,

        // filter settings
        filters: null,

        // grouping settings
        groupings: null,
        grouping_initial: null,
        grouping_direction: 'horizontal',

        // timing settings
        time_scale: 'Date',

        // date settings
        stdt_col: 'STDT',
        endt_col: 'ENDT',
        date_range: null,
        date_ranges: null,
        date_format: '%Y-%m-%d',
        date_display_format: '%b %y', // sync in syncSettings()

        // day settings
        stdy_col: 'STDY',
        endy_col: 'ENDY',
        day_range: null,
        day_ranges: null,

        // miscellaneous settings
        seq_col: 'SEQ',
        ongo_col: 'ONGO',
        ongo_val: 'Y',
        tooltip_col: 'TOOLTIP',
        offset_col: null,
        reference_lines: null,
        mark_thickness: 6,
        transpose_data: false,

        // listing settings
        details: null,
        details_config: null
    };
}
