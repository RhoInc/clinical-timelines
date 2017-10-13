import backButton from './onLayout/backButton';

export default function onLayout() {
    const context = this;

    //Add div for population stats.
    this.populationDetails.wrap = this.controls.wrap
        .append('div')
        .classed('annotation population-details', true);

    //Add div for back button and participant ID title.
    this.participantDetails.wrap = this.controls.wrap
        .append('div')
        .classed('annotation participant-details hidden', true)
        .html(`Viewing ${this.config.unit} <span id = 'participant'></span>`);

    //Add div for back button and participant ID title.
    this.backButton = this.controls.wrap
        .append('div')
        .classed('back-button hidden', true);
    this.backButton
            .append('button')
            .html('&#8592; Back')
            .on('click', () => {
                backButton.call(this);
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
