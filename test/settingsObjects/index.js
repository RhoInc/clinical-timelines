import defaultSettings from './defaultSettings';
import withoutDays from './withoutDays';
import withoutDates from './withoutDates';
import withGroupings from './withGroupings';

export default [
    {
        description: 'with default settings',
        settings: defaultSettings
    },
    {
        description: 'without days',
        settings: withoutDays
    },
    {
        description: 'without dates',
        settings: withoutDates
    },
    {
        description: 'with groupings',
        settings: withGroupings
    },
];
