export default function syncTimeScaleSettings(settings) {
    //X-axis
    settings.x.type = settings.time_scale === 'Study Day' ? 'linear' : 'time';
    settings.x.label = settings.time_scale;
    settings.x.format = settings.time_scale === 'Study Day' ? '1d' : settings.date_format;

    //Lines (events with duration)
    settings.marks[0].tooltip =
        settings.time_scale === 'Study Day'
            ? `Event: [${settings.event_col}]` +
              `\nStart Day: [${settings.stdy_col}]` +
              `\nStop Day: [${settings.endy_col}]`
            : `Event: [${settings.event_col}]` +
              `\nStart Date: [${settings.stdt_col}]` +
              `\nStop Date: [${settings.endt_col}]`;
    settings.marks[0].values =
        settings.time_scale === 'Study Day'
            ? { wc_category: [settings.stdy_col, settings.endy_col] }
            : { wc_category: [settings.stdt_col, settings.endt_col] };

    //Circles (events without duration)
    settings.marks[1].tooltip =
        settings.time_scale === 'Study Day'
            ? `Event: [${settings.event_col}]` + `\nStudy Day: [${settings.stdy_col}]`
            : `Event: [${settings.event_col}]` + `\nStudy Date: [${settings.stdt_col}]`;
    settings.marks[1].values =
        settings.time_scale === 'Study Day' ? { wc_category: ['DY'] } : { wc_category: ['DT'] };

    //Define right margin for vertical groupings and to prevent date tick label cutoff.
    settings.margin.right = settings.y.grouping || settings.time_scale === 'Date' ? 40 : 0;
}
