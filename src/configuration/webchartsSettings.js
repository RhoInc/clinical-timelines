export default function webchartsSettings() {
    return {
        x: {
            type: null, // set in syncSettings()
            column: 'wc_value',
            label: null, // set in syncSettings()
            format: null // set in syncSettings()
        },
        y: {
            type: 'ordinal',
            column: null, // set in syncSettings()
            label: null, // set in syncSettings()
            sort: 'By Earliest Event',
            behavior: 'flex',
            grouping: null // set in syncSettings()
        },
        marks: [
            {
                type: 'line',
                per: null, // set in syncSettings()
                tooltip: null, // set in syncSettings()
                attributes: {
                    'stroke-width': null // set in syncSettings()
                }
            },
            {
                type: 'circle',
                per: null, // set in syncSettings()
                tooltip: null, // set in syncSettings()
                radius: null, // set in syncSettings()
                attributes: {
                    'stroke-width': null // set in syncSettings()
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
        range_band: 35,
        margin: {
            top: 60,
            right: 40
        }, // for second x-axis
        resizable: false // can't be resizable so the multiples aren't overlapped by their titles
    };
}
