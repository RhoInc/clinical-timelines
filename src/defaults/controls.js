export default [
    {
        type: 'dropdown',
        option: 'highlightedEvent',
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
    }
];
