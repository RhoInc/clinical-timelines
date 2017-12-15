import arrayOfVariablesCheck from './arrayOfVariablesCheck';
import '../../util/number-isinteger';
import { time } from 'd3';

export default function syncRendererSpecificSettings(settings) {
    //ID
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

    //Events
    if (!(settings.event_types instanceof Array && settings.event_types.length))
        delete settings.event_types;

    //Filters
    const defaultFilters = [
        { value_col: settings.id_col, label: settings.id_unitPropCased },
        { value_col: settings.event_col, label: 'Event Type' }
    ];
    if (settings.ongo_col)
        defaultFilters.splice(2, 0, { value_col: settings.ongo_col, label: 'Ongoing?' });
    settings.filters = arrayOfVariablesCheck(defaultFilters, settings.filters);

    //Groupings
    const defaultGroupings = [];
    settings.groupings = arrayOfVariablesCheck(defaultGroupings, settings.groupings);
    if (['horizontal', 'vertical'].indexOf(settings.grouping_direction) === -1)
        settings.grouping_direction = 'horizontal';

    //Reference lines
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
                    ? 'Study Day'
                    : 'Date';

                //label predefined or not
                referenceLineObject.label = reference_line.label
                    ? reference_line.label
                    : `${referenceLineObject.time_scale}: ${referenceLineObject.timepoint}`;

                return referenceLineObject;
            })
            .filter(
                reference_line =>
                    (reference_line.time_scale === 'Study Day' &&
                        Number.isInteger(reference_line.timepoint)) ||
                    (reference_line.time_scale === 'Date' &&
                        time.format(settings.date_format).parse(reference_line.timepoint) instanceof
                            Date)
            );

        if (!settings.reference_lines.length) delete settings.reference_lines;
    }

    //Details
    const defaultDetails =
        settings.time_scale === 'Study Day'
            ? [
                  { value_col: settings.event_col, label: 'Event Type' },
                  { value_col: settings.stdy_col, label: 'Start Day' },
                  { value_col: settings.endy_col, label: 'Stop Day' },
                  { value_col: settings.seq_col, label: 'Sequence Number' }
              ]
            : [
                  { value_col: settings.event_col, label: 'Event Type' },
                  { value_col: settings.stdt_col, label: 'Start Date' },
                  { value_col: settings.endt_col, label: 'Stop Date' },
                  { value_col: settings.seq_col, label: 'Sequence Number' }
              ];
    settings.details = arrayOfVariablesCheck(defaultDetails, settings.details);
    settings.filters.forEach(filter => {
        if (settings.details.map(detail => detail.value_col).indexOf(filter.value_col) === -1)
            settings.details.push(filter);
    });
}
