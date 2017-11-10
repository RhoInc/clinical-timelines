import { select } from 'd3';
import backButton from './onLayout/backButton';
import toggleView from './onLayout/toggleView';
import augmentFilterControls from './onLayout/augmentFilterControls';
import augmentOtherControls from './onLayout/augmentOtherControls';
import drawParticipantTimeline from './functions/drawParticipantTimeline';

export default function onLayout() {
    const context = this;

    //Move control labels and descriptions inside a div to display them vertically, label on top of description.
    this.controls.wrap.selectAll('.control-group').each(function(d) {
        const controlGroup = select(this),
            label = controlGroup.select('.control-label'),
            description = controlGroup.select('.span-description'),
            container = controlGroup
                .insert('div', ':first-child')
                .classed('label-description', true);

        container.node().appendChild(label.node());
        container.node().appendChild(description.node());

        if (d.value_col === context.config.event_col) controlGroup.classed('hidden', true);
    });

    //Add container for population details.
    this.populationDetails.wrap = this.controls.wrap
        .insert('div', ':first-child')
        .classed('annotation population-details', true);

    //Add container for ID characteristics.
    this.participantDetails.wrap = this.controls.wrap
        .insert('div', ':first-child')
        .classed('annotation participant-details hidden', true);
    this.participantDetails.wrap
        .append('div')
        .html(`${this.config.id_unitPropCased}: <span id = 'participant'></span>`);
    this.participantDetails.wrap
        .selectAll('div.characteristic')
        .data(this.config.id_characteristics)
        .enter()
        .append('div')
        .classed('characteristic', true)
        .html(d => `${d.label}: <span id = '${d.value_col}'></span>`);

    //Add back button to return from participant timeline to clinical timelines.
    this.backButton = this.controls.wrap.append('div').classed('back-button hidden', true);
    this.backButton
        .append('button')
        .html('&#8592; Back')
        .on('click', () => {
            backButton.call(this);
        });

    //Add additional functionality to filter event listeners.
    augmentFilterControls.call(this);

    //Add additional functionality to other control event listeners.
    augmentOtherControls.call(this);

    //Add top x-axis.
    this.svg
        .append('g')
        .classed('x-top axis linear', true)
        .append('text')
        .classed('axis-title top', true);
}
