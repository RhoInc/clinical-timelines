export default [
    {
        type: 'dropdown',
        option: 'highlightedEvent',
        label: 'Highlighted Event Type',
        description: 'aesthetics',
        values: null // set in onInit() callback
    },
    {
        type: 'radio',
        option: 'y.sort',
        label: 'Sort participants',
        values: ['earliest', 'alphabetical-descending'],
        relabels: ['by earliest event', 'alphanumerically']
    }
];
