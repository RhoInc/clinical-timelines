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
    const lines = settings.marks[0];
    lines.per = [settings.id_col, settings.event_col, settings.seq_col];
    lines.attributes['stroke-width'] = settings.mark_thickness*1.25;

    //Circles
    const circles = settings.marks[1];
    circles.per = [settings.id_col, settings.event_col, settings.seq_col, 'wc_value'];
    circles.radius = settings.mark_thickness;
    circles.attributes['stroke-width'] = 2/3*settings.mark_thickness;

    //Color stratification
    settings.color_by = settings.event_col;

    //Add space at bottom of timeline to create space for the last ID's offset marks.
    settings.margin.bottom = settings.margin.top + settings.range_band;
}
