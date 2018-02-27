import arrayOfVariablesCheck from './arrayOfVariablesCheck';
import { time } from 'd3';

export default function syncRendererSpecificSettings(settings) {
    /**-------------------------------------------------------------------------------------------\
      ID settings
    \-------------------------------------------------------------------------------------------**/

    //id_unit
    settings.id_unit = settings.id_unit.replace(/^\s+|\s+$/g, ''); // remove leading and trailing white space
    settings.id_unitPropCased =
        settings.id_unit.substring(0, 1).toUpperCase() +
        settings.id_unit.substring(1).toLowerCase();
    settings.id_unitPlural = /y$/.test(settings.id_unit)
        ? settings.id_unit.substring(0, settings.id_unit.length - 1) + 'ies'
        : settings.id_unit + 's';

    //id_characteristics
    const defaultID_characteristics = [
        { value_col: settings.id_col, label: settings.id_unitPropCased }
    ];
    settings.id_characteristics = arrayOfVariablesCheck(
        defaultID_characteristics,
        settings.id_characteristics
    );

    /**-------------------------------------------------------------------------------------------\
      Event settings
    \-------------------------------------------------------------------------------------------**/

    //event_types
    if (!(settings.event_types instanceof Array && settings.event_types.length))
        delete settings.event_types;

    /**-------------------------------------------------------------------------------------------\
      Filter settings
    \-------------------------------------------------------------------------------------------**/

    //filters
    const defaultFilters = [
        { value_col: settings.id_col, label: settings.id_unitPropCased },
        { value_col: settings.event_col, label: 'Event Type' }
    ];
    if (settings.ongo_col)
        defaultFilters.splice(2, 0, { value_col: settings.ongo_col, label: 'Ongoing?' });
    settings.filters = arrayOfVariablesCheck(defaultFilters, settings.filters);

    /**-------------------------------------------------------------------------------------------\
      Grouping settings
    \-------------------------------------------------------------------------------------------**/

    //groupings
    const defaultGroupings = [];
    settings.groupings = arrayOfVariablesCheck(defaultGroupings, settings.groupings);

    //grouping direction
    if (['horizontal', 'vertical'].indexOf(settings.grouping_direction) === -1)
        settings.grouping_direction = 'horizontal';

    /**-------------------------------------------------------------------------------------------\
      Timing settings
    \-------------------------------------------------------------------------------------------**/

    //time_scale
    settings.time_scale =
        ['date', 'day'].indexOf(settings.time_scale.toLowerCase()) > -1
            ? settings.time_scale.toLowerCase()
            : 'date';

    //date_display_format
    settings.date_display_format = settings.date_display_format || settings.date_format;

    //date_ranges - array of 2-element date ranges or of objects with a label property and a time_range property
    //  {
    //      domain: [
    //          <lower bound>,
    //          <upper bound>
    //      ],
    //      label: '<date range description>'
    //  }
    if (settings.date_range && settings.date_ranges === null)
        settings.date_ranges = [
            {
                domain: settings.date_range,
                label: 'default'
            }
        ];
    if (settings.date_ranges)
        settings.date_ranges = settings.date_ranges
            .filter(date_range => {
                const domain = date_range.domain || date_range;
                return (
                    domain instanceof Array &&
                    domain.length === 2 &&
                    domain[0].toString() !== domain[1].toString() &&
                    domain.every(
                        d => d instanceof Date || time.format(settings.date_format).parse(d)
                    )
                );
            })
            .map(date_range => {
                const domain = (date_range.domain || date_range).map(
                    date =>
                        date instanceof Date ? date : time.format(settings.date_format).parse(date)
                );
                const label =
                    date_range.label ||
                    domain
                        .map(
                            date =>
                                date instanceof Date
                                    ? time.format(settings.date_display_format)(date)
                                    : date
                        )
                        .join(' - ');
                return {
                    domain,
                    label
                };
            });
    else settings.date_ranges = [];
    console.log(settings.date_ranges);

    //day_ranges - array of 2-element day ranges or of objects with a label property and a time_range property
    //  {
    //      domain: [
    //          <lower bound>,
    //          <upper bound>
    //      ],
    //      label: '<day range description>'
    //  }
    if (settings.day_range && settings.day_ranges === null)
        settings.day_ranges = [
            {
                domain: settings.day_range,
                label: 'default'
            }
        ];
    if (settings.day_ranges)
        settings.day_ranges = settings.day_ranges
            .filter(day_range => {
                const domain = day_range.domain || day_range;
                return (
                    domain instanceof Array &&
                    domain.length === 2 &&
                    domain[0].toString() !== domain[1].toString() &&
                    domain.every(d => Number.isInteger(+d))
                );
            })
            .map(day_range => {
                const domain = day_range.domain || day_range;
                const label = day_range.label || domain.join(' - ');
                return {
                    domain,
                    label
                };
            });
    else settings.day_ranges = [];

    /**-------------------------------------------------------------------------------------------\
      Miscellaneous settings
    \-------------------------------------------------------------------------------------------**/

    //reference_lines
    if (settings.reference_lines) {
        if (!(settings.reference_lines instanceof Array))
            settings.reference_lines = [settings.reference_lines];

        settings.reference_lines = settings.reference_lines
            .map(reference_line => {
                const referenceLineObject = {};

                //either an object or not
                referenceLineObject.timepoint =
                    reference_line instanceof Object ? reference_line.timepoint : reference_line;

                //either an integer or not
                referenceLineObject.time_scale = Number.isInteger(+referenceLineObject.timepoint)
                    ? 'day'
                    : 'date';

                //label predefined or not
                referenceLineObject.label = reference_line.label
                    ? reference_line.label
                    : `${referenceLineObject.time_scale.substring(0, 1).toUpperCase() +
                          referenceLineObject.time_scale.substring(
                              1
                          )}: ${referenceLineObject.timepoint}`;

                return referenceLineObject;
            })
            .filter(
                reference_line =>
                    (reference_line.time_scale === 'day' &&
                        Number.isInteger(reference_line.timepoint)) ||
                    (reference_line.time_scale === 'date' &&
                        time.format(settings.date_format).parse(reference_line.timepoint) instanceof
                            Date)
            );

        if (!settings.reference_lines.length) delete settings.reference_lines;
    }

    /**-------------------------------------------------------------------------------------------\
      Listing settings
    \-------------------------------------------------------------------------------------------**/

    //details
    const defaultDetails = [
        { value_col: settings.event_col, label: 'Event Type' },
        { value_col: 'stdtdy', label: `Start Date (Day)` },
        { value_col: 'endtdy', label: `Stop Date (Day)` },
        { value_col: settings.seq_col, label: 'Sequence Number' }
    ];

    //add ongo_col if specified
    if (settings.ongo_col) defaultDetails.push({ value_col: settings.ongo_col, label: 'Ongoing?' });

    //add tooltip_col if specified
    if (settings.tooltip_col)
        defaultDetails.push({ value_col: settings.tooltip_col, label: 'Details' });

    settings.details = arrayOfVariablesCheck(defaultDetails, settings.details);

    //add filters
    settings.filters
        .filter(filter => filter.value_col !== settings.id_col) // remove id_col
        .filter(
            filter =>
                settings.id_characteristics
                    .map(id_characteristic => id_characteristic.value_col)
                    .indexOf(filter.value_col) < 0
        ) // remove id_characteristics
        .forEach(filter => {
            if (settings.details.map(detail => detail.value_col).indexOf(filter.value_col) === -1)
                settings.details.push(filter);
        });
}
