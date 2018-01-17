export default function syncWebchartsSettings(settings) {
    //Y-axis
    settings.y.column = settings.id_col;
    if (settings.grouping_initial) {
        settings.y.grouping = settings.grouping_initial;
        settings.y.groupingLabel =
            settings.groupings[
                settings.groupings
                    .map(grouping => grouping.value_col)
                    .indexOf(settings.grouping_initial)
            ].label;
    }

    //Lines
    settings.marks[0].per = [settings.id_col, settings.event_col, settings.seq_col];

    //Circles
    settings.marks[1].per = [settings.id_col, settings.event_col, settings.seq_col, 'wc_value'];

    //Color stratification
    settings.color_by = settings.event_col;

    //Add space at bottom of timeline to create space for the last ID's offset marks.
    settings.margin.bottom = settings.margin.top + settings.range_band;
}
