export default [
    {
        type: 'dropdown',
        option: 'event_highlighted',
        label: '',
        description: 'Event highlighting',
        values: null // set in onInit() callback
    },
    {
        type: 'dropdown',
        option: 'time_scale',
        values: ['date', 'day'],
        relabels: ['Date', 'Day'],
        label: '',
        description: 'X-axis scale',
        require: true
    },
    {
        type: 'dropdown',
        option: 'time_range',
        values: ['full', 'custom'],
        relabels: ['Full', 'Custom'],
        label: '',
        description: 'Time range',
        require: true
    },
    {
        type: 'dropdown',
        option: 'y.sort',
        label: '',
        description: 'Y-axis sort',
        values: ['earliest', 'alphabetical-descending'],
        relabels: ['by earliest event', 'alphanumerically'],
        require: true
    },
    {
        type: 'dropdown',
        option: 'y.grouping',
        label: '',
        description: 'Y-axis grouping'
    }
];
