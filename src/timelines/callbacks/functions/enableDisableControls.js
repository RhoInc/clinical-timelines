import hideTimeRangeControl from '../onLayout/hideTimeRangeControl';

export default function enableDisableControls() {
    //Enable/Disable controls other than ID and Event Type filters.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(
            control =>
                control.value_col !== this.config.id_col &&
                control.option !== 'event_highlighted' &&
                control.option !== 'time_scale' &&
                control.value_col !== this.config.event_col
        )
        .classed('ct-hidden', !!this.selected_id);

    //Hide/unhide ID filter horizontal rule.
    this.controls.wrap
        .select('.ct-filters.ct-ID-filters')
        .classed('ct-hidden', !!this.selected_id);

    //Hide/unhide reference line tables.
    this.clinicalTimelines.containers.leftColumn
        .selectAll('.ct-reference-line-table-container')
        .classed('ct-hidden', !!this.selected_id);

    if (!this.selected_id) hideTimeRangeControl.call(this);
}
