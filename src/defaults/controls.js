export default [
    {
        type: 'dropdown',
        option: 'event_highlighted',
        label: 'Event Type',
        description: 'highlighting',
        values: null // set in onInit() callback
    },
    {
        type: 'dropdown',
        option: 'y.sort',
        label: 'Y-axis',
        description: 'sort',
        values: ['earliest', 'alphabetical-descending'],
        relabels: ['by earliest event', 'alphanumerically'],
        require: true
    },
    {
        type: 'dropdown',
        option: 'y.grouping',
        label: 'Y-axis',
        description: 'grouping'
    },
    {
        type: 'dropdown',
        option: 'time_scale',
        values: ['Study Day', 'Date'],
        label: 'X-axis',
        description: 'scale',
        require: true
    }
];
