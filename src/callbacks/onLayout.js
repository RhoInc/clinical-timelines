import backButton from './onLayout/backButton';
import toggleView from './onLayout/toggleView';
import drawParticipantTimeline from './functions/drawParticipantTimeline';
import { select } from 'd3';

export default function onLayout() {
    const context = this,
        controls = this.controls.wrap.selectAll('.control-group');

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
        .html(`${this.config.unitPropCased}: <span id = 'participant'></span>`);
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

    //Relabel Y-axis sort options and remove illogical Y-axis grouping options.
    controls.filter(d => d.type !== 'subsetter').each(function(d) {
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
                //Y-axis groupings that make sense are ID-level and not event level.
                options.classed(
                    'hidden',
                    di =>
                        !(
                            ['None', context.config.site_col].indexOf(di) > -1 ||
                            context.config.id_characteristics
                                .map(dii => dii.value_col)
                                .indexOf(di) > -1
                        )
                );
        }
    });

    //Set to selected event types specified in settings.eventTypes and handle clinical timelines and participant timeline toggle.
    controls
        .filter(d => d.type === 'subsetter')
        .each(function(d) {
            if (d.label === 'Event Type')
                select(this)
                    .selectAll('option')
                    .property('selected', di => {
                        return context.currentEventTypes instanceof Array
                            ? context.currentEventTypes.indexOf(di) > -1
                            : true;
                    });
        })
        .on('change', d => {
            if (d.value_col === this.config.id_col) toggleView.call(this);
            else if (d.value_col === this.config.event_col) {
                this.currentEventTypes = this.filters.filter(
                    di => di.col === this.config.event_col
                )[0].val;

                if (this.selected_id) drawParticipantTimeline.call(this);
            }
        });
}
