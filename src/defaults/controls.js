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
        label: '',
        description: 'X-axis scale',
        values: ['date', 'day'],
        require: true
    },
    {
        type: 'dropdown',
        option: 'date_time_range',
        label: '',
        description: 'Time range',
        values: null, // set in onInit() callback
        require: true
    },
    {
        type: 'dropdown',
        option: 'day_time_range',
        label: '',
        description: 'Time range',
        values: null, // set in onInit() callback
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
