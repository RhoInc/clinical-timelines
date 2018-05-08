import { format, time } from 'd3';

export default function syncTimeScaleSettings(settings) {
    settings.time_scalePropCased =
        settings.time_scale.substring(0, 1).toUpperCase() + settings.time_scale.substring(1);

    //Define settings variables to handle both date and day time scales.
    if (settings.time_scale === 'date') {
        settings.st_col = settings.stdt_col;
        settings.en_col = settings.endt_col;
        settings.x.type = 'time';
        settings.x.format = settings.date_display_format;
        settings.time_unit = 'DT';

        settings.x_parseFormat = time.format(settings.date_format);
        settings.x_displayFormat = time.format(settings.date_display_format);
        settings.time_function = dt => {
            let parsed;
            try {
                parsed = settings.x_parseFormat.parse(dt) || new Date(dt);
            } catch (error) {
                parsed = new Date(dt);
            }
            return parsed;
        };
    } else if (settings.time_scale === 'day') {
        settings.st_col = settings.stdy_col;
        settings.en_col = settings.endy_col;
        settings.x.type = 'linear';
        settings.x.format = '1f';
        settings.time_unit = 'DY';

        settings.x_parseFormat = format(settings.x.format);
        settings.x_displayFormat = settings.x_parseFormat;
        settings.time_function = dy => +settings.x_displayFormat(+dy);
    }

    //Time intervals (lines)
    settings.marks[0].tooltip =
        `Event: [${settings.event_col}]` +
        `\nStart ${settings.time_scale}: [${settings.st_col}]` +
        `\nStop ${settings.time_scale}: [${settings.en_col}]`;
    settings.marks[0].values = { wc_category: [settings.st_col, settings.en_col] };

    //Timepoints (circles)
    settings.marks[1].tooltip =
        `Event: [${settings.event_col}]` +
        `\n${settings.time_scalePropCased}: [${settings.st_col}]`;
    settings.marks[1].values = { wc_category: settings.time_unit };
}
