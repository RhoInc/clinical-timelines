export default function onLayout() {
    //Create div for back button and participant ID title.
    this.wrap
        .insert('div', ':first-child')
        .classed('back-button', true)
            .append('button')
            .html('&#8592; Back')
            .on('click', () => {
                this.participantTimeline.wrap
                    .classed('hidden', true);
                this.listing
                    .classed('hidden', true);
                this.controls.wrap
                    .style('display', 'block');
                this.wrap
                    .style('display', 'block');
            });
}
