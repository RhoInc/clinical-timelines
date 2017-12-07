export default {

<<<<<<< HEAD
    event_col: 'DOMAIN',
    event_types: null,
    event_highlighted: null,
    event_highlight_color: 'black',
=======
    /**-------------------------------------------------------------------------------------------\
      Renderer-specific settings
    \-------------------------------------------------------------------------------------------**/
>>>>>>> date-reference-lines

      //ID settings
        id_col: 'USUBJID',
        id_unit: 'participant',
        id_characteristics: null,

      //Event settings
        event_col: 'DOMAIN',
        event_types: null,
        event_highlighted: null,

<<<<<<< HEAD
    time_scale: 'Study Day',
    stdy_col: 'STDY',
    endy_col: 'ENDY',
    study_day_range: null,
    stdt_col: 'STDT',
    endt_col: 'ENDT',
    date_range: null,
    date_format: '%Y-%m-%d',
    date_display_format: '%b %y', // sync in syncSettings()
=======
      //Filter settings
        filters: null,
>>>>>>> date-reference-lines

      //Grouping settings
        groupings: null,
        grouping_initial: null,
        grouping_direction: 'horizontal',

      //Timing settings
        time_scale: 'Study Day',

<<<<<<< HEAD
    //Standard webcharts settings
    x: {
        type: null, // set in syncSettings()
        column: 'wc_value',
        label: null, // set in syncSettings()
        format: null // set in syncSettings()
    },
    y: {
        type: 'ordinal', // set in syncSettings()
        column: null,
        label: null,
        sort: 'earliest',
        behavior: 'flex',
        grouping: null
    },
    marks: [
        {
            type: 'line',
            per: null, // set in syncSettings()
            tooltip: null, // set in syncSettings()
            attributes: {
                'stroke-width': 4
            }
        },
        {
            type: 'circle',
            per: null, // set in syncSettings()
            tooltip: null, // set in syncSettings()
            radius: 4,
            attributes: {
                'stroke-width': 2
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
        label: 'Event Type',
        order: null, // set in syncSettings()
        mark: 'circle'
    },
    range_band: 30,
    margin: { top: 50 }, // for second x-axis
    resizable: false // can't be resizable so the multiples aren't overlapped by their titles
=======
          //Study day settings
            stdy_col: 'STDY',
            endy_col: 'ENDY',
            study_day_range: null,

          //Date settings
            stdt_col: 'STDT',
            endt_col: 'ENDT',
            date_range: null,
            date_format: '%Y-%m-%d',

      //Miscellaneous settings
        seq_col: 'SEQ',
        tooltip_col: 'TOOLTIP',
        ongo_col: 'ONGO',
        ongo_val: 'Y',
        reference_lines: null,

      //Listing settings
        details: null,
        details_config: null,

    /**-------------------------------------------------------------------------------------------\
      Standard webcharts settings
    \-------------------------------------------------------------------------------------------**/

        x: {
            type: null, // set in syncSettings()
            column: 'wc_value',
            label: null, // set in syncSettings()
            format: null // set in syncSettings()
        },
        y: {
            type: 'ordinal', // set in syncSettings()
            column: null,
            label: null,
            sort: 'earliest',
            behavior: 'flex',
            grouping: null
        },
        marks: [
            {
                type: 'line',
                per: null, // set in syncSettings()
                tooltip: null, // set in syncSettings()
                attributes: {
                    'clip-path': 'url(#1)',
                    'stroke-width': 4,
                    'stroke-opacity': 1
                }
            },
            {
                type: 'circle',
                per: null, // set in syncSettings()
                tooltip: null, // set in syncSettings()
                radius: '3',
                attributes: {
                    'clip-path': 'url(#1)',
                    fill: 'white',
                    'fill-opacity': 1,
                    'stroke-opacity': 1,
                    'stroke-width': 2
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
            label: 'Event Type',
            order: null, // set in syncSettings()
            mark: 'circle'
        },
        gridlines: 'y',
        range_band: 24,
        margin: { top: 50 }, // for second x-axis
        resizable: false // can't be resizable so the multiples aren't overlapped by their titles
>>>>>>> date-reference-lines
};
