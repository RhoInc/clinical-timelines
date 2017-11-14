export default function syncIDtimelineSettings(settings) {
    settings.x.label = '';
    settings.y.column = settings.seq_col;
    settings.y.sort = 'alphabetical-descending';
    settings.marks[0].per = [settings.event_col, settings.seq_col];
    settings.marks[1].per = [settings.event_col, settings.seq_col, 'wc_value'];
    settings.range_band = settings.range_band / 2;
    settings.margin = { left: 25 };
}
