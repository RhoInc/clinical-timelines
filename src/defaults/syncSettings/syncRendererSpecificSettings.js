import arrayOfVariablesCheck from './arrayOfVariablesCheck';
import '../../util/number-isinteger';
import { time } from 'd3';

export default function syncRendererSpecificSettings(settings) {
    //ID settings
    settings.id_unit = settings.id_unit.replace(/^\s+|\s+$/g, ''); // remove leading and trailing white space
    settings.id_unitPropCased =
        settings.id_unit.substring(0, 1).toUpperCase() +
        settings.id_unit.substring(1).toLowerCase();
    settings.id_unitPlural = /y$/.test(settings.id_unit)
        ? settings.id_unit.substring(0, settings.id_unit.length - 1) + 'ies'
        : settings.id_unit + 's';
    const defaultID_characteristics = [
        { value_col: settings.id_col, label: settings.id_unitPropCased }
    ];
    settings.id_characteristics = arrayOfVariablesCheck(
        defaultID_characteristics,
        settings.id_characteristics
    );

    //Event settings
    if (!(settings.event_types instanceof Array && settings.event_types.length))
        delete settings.event_types;

    //Filter settings
    const defaultFilters = [
        { value_col: settings.id_col, label: settings.id_unitPropCased },
        { value_col: settings.event_col, label: 'Event Type' }
    ];
    if (settings.ongo_col)
        defaultFilters.splice(2, 0, { value_col: settings.ongo_col, label: 'Ongoing?' });
    settings.filters = arrayOfVariablesCheck(defaultFilters, settings.filters);

    //Grouping settings
    const defaultGroupings = [];
    settings.groupings = arrayOfVariablesCheck(defaultGroupings, settings.groupings);
    if (['horizontal', 'vertical'].indexOf(settings.grouping_direction) === -1)
        settings.grouping_direction = 'horizontal';

    //Time settings
    settings.date_display_format = settings.date_display_format || settings.date_format;

    //Reference line settings
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
                          referenceLineObject.time_scale.substring(1)}: ${
                          referenceLineObject.timepoint
                      }`;

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
      Define listing columns.
    \-------------------------------------------------------------------------------------------**/

    //defaults
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
