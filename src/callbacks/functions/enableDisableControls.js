export default function enableDisableControls() {
    //Enable/Disable controls other than ID and Event Type filters.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(
            control => [this.config.id_unitPropCased, 'Event Type'].indexOf(control.label) === -1
        )
        .selectAll('select,input')
        .property('disabled', !!this.selected_id);
}
