export default function updateIDfilter() {
    const IDfilter = this.controls.wrap
        .selectAll('.control-group')
        .filter(control => control.value_col === this.config.id_col);

    //Update selected option.
    IDfilter.selectAll('option').property('selected', option => option === this.selected_id);

    //Update ID object in filters array.
    this.filters.filter(filter => filter.col === this.config.id_col)[0].val =
        this.selected_id || 'All';

    //Bring focus to the ID dropdown.
    IDfilter.style({
        'font-weight': 'bold'
    })
        .transition()
        .delay(1000)
        .style({
            'font-weight': 'normal'
        })
        .select('select')
        .node()
        .focus();
}
