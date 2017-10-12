export default function onLayout() {
    const context = this;

    //Add div for population stats.
    this.populationDetails.wrap = this.controls.wrap
        .append('div')
        .classed('population-details', true);

    //Add div for back button and participant ID title.
    this.participantDetails.wrap = this.controls.wrap
        .append('div')
        .classed('participant-details', true)
        .html(`Viewing ${this.config.unit} <span id = 'participant'></span>`);

    //Add div for back button and participant ID title.
    this.controls.wrap
        .append('div')
        .classed('back-button hidden', true)
            .append('button')
            .html('&#8592; Back')
            .on('click', () => {
                this.controls.wrap
                    .selectAll('.control-group select')
                    .property('disabled', false);
                this.participantDetails.wrap
                    .classed('hidden', true);
                this.populationDetails.wrap
                    .classed('hidden', false);
                this.participantTimeline.wrap
                    .classed('hidden', true);
                this.listing.wrap
                    .classed('hidden', true);
                this.populationDetails.annotation.classed('hidden', false);
                this.wrap
                    .classed('hidden', false);
                this.participantDetails.wrap.classed('hidden', true);
            });

    //Add top x-axis.
    const
        topXaxis = this.svg
            .append('g')
            .classed('x-top axis linear', true);
        topXaxis
            .append('text')
            .classed('axis-title top', true)
            .text(this.config.x_label);
}
