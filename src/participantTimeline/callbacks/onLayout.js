export default function onLayout() {
    const context = this;

    //Create div for back button and participant ID title.
    this.wrap
        .insert('div', ':first-child')
        .classed('back-button', true)
            .append('button')
            .html('&#8592; Back')
            .on('click', () => {
                this.wrap
                    .classed('hidden', true);
                this.clinicalTimelines.listing
                    .classed('hidden', true);
                this.controls.wrap
                    .selectAll('.control-group select')
                    .property('disabled', false);
                this.wrap
                    .classed('hidden', false);
            });
}
