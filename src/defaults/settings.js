export default //Renderer-specific settings
{
    id_col: 'USUBJID',
    id_unit: 'participant',
    id_characteristics: null,

    event_col: 'DOMAIN',
    event_types: null,
    event_highlighted: null,

    site_col: 'SITE',
    filters: null,

    groupings: null,
    grouping_initial: null,
    grouping_direction: 'horizontal',

    stdy_col: 'STDY',
    endy_col: 'ENDY',
    seq_col: 'SEQ',
    tooltip_col: 'TOOLTIP',

    ongo_col: 'ONGO',
    ongo_val: 'Y',

    reference_lines: null,

    details: null,
    details_config: null,

    //Standard webcharts settings
    x: {
        type: 'linear',
        column: 'wc_value',
        label: 'Study Day'
    },
    y: {
        type: 'ordinal', // set in syncSettings()
        column: null,
        label: null,
        sort: 'alphabetical-descending',
        behavior: 'flex',
        grouping: null
    },
    marks: [
        {
            type: 'line',
            per: null, // set in syncSettings()
            tooltip: null, // set in syncSettings()
            attributes: {
                'stroke-width': 3,
                'stroke-opacity': 1
            }
        },
        {
            type: 'circle',
            per: null, // set in syncSettings()
            tooltip: null, // set in syncSettings()
            radius: '3',
            attributes: {
                'fill-opacity': 1,
                'stroke-opacity': 1
            }
        }
    ],
    colors: [
        '#1b9e77',
        '#d95f02',
        '#7570b3',
        '#a6cee3',
        '#1f78b4',
        '#b2df8a',
        '#66c2a5',
        '#fc8d62',
        '#8da0cb'
    ],
    color_dom: null, // set in syncSettings()
    legend: {
        location: 'top',
        label: '',
        mark: 'circle',
        order: null
    }, // set in syncSettings()
    gridlines: 'y',
    range_band: 24,
    margin: { top: 50 }, // for second x-axis
    resizable: true
};
