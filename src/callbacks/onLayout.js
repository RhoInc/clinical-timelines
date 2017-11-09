import backButton from './onLayout/backButton';
import { select, merge } from 'd3';
import toggleView from './onLayout/toggleView';
import drawParticipantTimeline from './functions/drawParticipantTimeline';
import clone from '../util/clone';

export default function onLayout() {
    const context = this;

    //Add container for population details.
    this.populationDetails.wrap = this.controls.wrap
        .append('div')
        .classed('annotation population-details', true);

    //Add container for ID characteristics.
    this.participantDetails.wrap = this.controls.wrap
        .append('div')
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

    //Add top x-axis.
    this.svg
        .append('g')
        .classed('x-top axis linear', true)
        .append('text')
        .classed('axis-title top', true)
        .text('Study Day');

    /**-------------------------------------------------------------------------------------------\
      Control customization
    \-------------------------------------------------------------------------------------------**/

    const controls = this.controls.wrap.selectAll('.control-group'),
        filters = controls.filter(d => d.type === 'subsetter'),
        otherControls = controls.filter(d => d.type !== 'subsetter');

    //Set to selected event types specified in settings.event_types and handle clinical timelines and participant timeline toggle.
    filters
        //Highlight selectecd event types in select.
        .each(function(d) {
            if (d.value_col === context.config.event_col)
                select(this)
                    .selectAll('option')
                    .property('selected', di => {
                        return context.currentEventTypes instanceof Array
                            ? context.currentEventTypes.indexOf(di) > -1
                            : true;
                    });
        })
        .on('change', d => {
            const filter = this.filters.filter(filter => filter.col === d.value_col)[0];

            //Update currently selected ID and toggle view.
            if (filter.col === this.config.id_col) {
                this.selected_id = filter.val !== 'All' ? filter.val : null;
                toggleView.call(this);
            } else if (d.value_col === this.config.event_col) {
                //Re-draw participant timeline if in participant timeline view.
                this.currentEventTypes = filter.val;

                if (this.selected_id) drawParticipantTimeline.call(this);
            }
        });

    //Relabel Y-axis sort options and remove illogical Y-axis grouping options.
    otherControls.each(function(d) {
        const control = select(this),
            options = control.selectAll('option');

        if (d.label === 'Y-axis') {
            //Add labels to Y-axis sort.
            if (d.description === 'sort')
                options.property(
                    'label',
                    di => d.relabels[d.values.filter(dii => dii !== 'None').indexOf(di)]
                );
            else if (d.description === 'grouping')
                //Add variable labels to Y-axis grouping options.
                options.property(
                    'label',
                    di =>
                        di !== 'None'
                            ? context.config.groupings[
                                  context.config.groupings.map(dii => dii.value_col).indexOf(di)
                              ].label
                            : 'None'
                );
        }
    });
}
