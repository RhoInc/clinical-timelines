import { select } from 'd3';
import backButton from './onLayout/backButton';
import toggleView from './onLayout/toggleView';
import augmentFilterControls from './onLayout/augmentFilterControls';
import augmentOtherControls from './onLayout/augmentOtherControls';

export default function onLayout() {
    const context = this;

    //Move control labels and descriptions inside a div to display them vertically, label on top of description.
    this.controls.wrap.selectAll('.control-group').each(function(d) {
        const controlGroup = select(this),
            label = controlGroup.select('.control-label'),
            description = controlGroup.select('.span-description'),
            container = controlGroup.append('div').classed('label-description', true);

        controlGroup.attr('class', `${controlGroup.attr('class')} ${d.type}`);

        container.node().appendChild(label.node());
        container.node().appendChild(description.node());

        //Add horizontal rule to group filters.
        if (d.value_col === context.config.id_col)
            context.controls.wrap
                .insert('div', ':first-child')
                .classed('controls horizontal-rule', true)
                .text('Controls');
        else if (d.option === 'y.grouping') {
            const filterRule = context.controls.wrap
                .append('div')
                .classed('filters horizontal-rule', true)
                .text('Filters');
            context.controls.wrap.node().insertBefore(filterRule.node(), this.nextSibling);
        }
    });

    //Add container for population details.
    this.populationDetails.wrap = this.leftSide
        .insert('div', ':first-child')
        .classed('annotation population-details', true);

    //Add container for ID characteristics.
    this.IDdetails.wrap = this.leftSide
        .insert('div', ':first-child')
        .classed('annotation ID-details hidden', true);
    this.IDdetails.wrap
        .append('div')
        .html(`${this.config.id_unitPropCased}: <span id = 'ID'></span>`);
    this.IDdetails.wrap
        .selectAll('div.characteristic')
        .data(this.config.id_characteristics)
        .enter()
        .append('div')
        .classed('characteristic', true)
        .html(d => `${d.label}: <span id = '${d.value_col}'></span>`);

    //Add back button to return from ID timeline to clinical timelines.
    this.backButton = this.IDdetails.wrap
        .insert('div', ':first-child')
        .classed('back-button hidden', true);
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
