import { format, time } from 'd3';

export default function syncTimeScaleSettings(settings) {
    if (settings.time_scale === 'day') {
        settings.st_col = settings.stdy_col;
        settings.en_col = settings.endy_col;
        settings.x_type = 'linear';
        settings.time_unit = 'DY';
        settings.x_format = '1d';
        settings.x_d3format = format(settings.x_format);
        settings.time_function = dy => +dy;
    } else if (settings.time_scale === 'date') {
        settings.st_col = settings.stdt_col;
        settings.en_col = settings.endt_col;
        settings.x_type = 'time';
        settings.time_unit = 'DT';
        settings.x_format = settings.date_format;
        settings.x_d3format = time.format(settings.x_format);
        settings.time_function = dt =>
            settings.x_d3format.parse(dt) ? settings.x_d3format.parse(dt) : new Date(dt);
    }

    settings.x.type = settings.x_type;
    settings.x.label =
        settings.time_scale.substring(0, 1).toUpperCase() + settings.time_scale.substring(1);
    settings.x.format = settings.x_format;

    //Time intervals (lines)
    settings.marks[0].tooltip =
        `Event: [${settings.event_col}]` +
        `\nStart ${settings.time_scale}: [${settings.st_col}]` +
        `\nStop ${settings.time_scale}: [${settings.en_col}]`;
    settings.marks[0].values = { wc_category: [settings.st_col, settings.en_col] };

    //Timepoints (circles)
    settings.marks[1].tooltip =
        `Event: [${settings.event_col}]` + `\n${settings.time_scale}: [${settings.st_col}]`;
    settings.marks[1].values = { wc_category: settings.time_unit };
}
