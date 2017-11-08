export default function updateIDfilter() {
    //Update participant filter.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => control.value_col === this.config.id_col)
        .selectAll('option')
        .property('selected', option => option === this.selected_id);
    this.filters
        .filter(filter => filter.col === this.config.id_col)[0].val = this.selected_id || 'All';
}
