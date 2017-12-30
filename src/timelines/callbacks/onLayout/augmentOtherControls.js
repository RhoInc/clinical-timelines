import { select } from 'd3';
import eventHighlightingChange from './augmentOtherControls/eventHighlightingChange';
import timeScaleChange from './augmentOtherControls/timeScaleChange';

export default function augmentOtherControls() {
    const context = this,
        otherControls = this.controls.wrap
            .selectAll('.control-group')
            .filter(d => d.type !== 'subsetter')
            .classed('ct-control', true)
            .attr('id', d => `control-${d.option.replace('.', '-')}`);

    //Relabel Y-axis sort options and remove illogical Y-axis grouping options.
    otherControls
        .filter(d => ['Y-axis sort', 'Y-axis grouping'].indexOf(d.description) > -1)
        .each(function(d) {
            // Y-axis controls
            const options = select(this).selectAll('option');

            if (d.description === 'Y-axis sort')
                // Add labels to Y-axis sort.
                options.property(
                    'label',
                    di => d.relabels[d.values.filter(dii => dii !== 'None').indexOf(di)]
                );
            else if (d.description === 'Y-axis grouping')
                // Add variable labels to Y-axis grouping options.
                options.property(
                    'label',
                    di =>
                        di !== 'None'
                            ? context.config.groupings[
                                  context.config.groupings.map(dii => dii.value_col).indexOf(di)
                              ].label
                            : 'None'
                );
        });

    //Redefine event highlighting event listener.
    otherControls
        .filter(d => d.option === 'event_highlighted')
        .select('select')
        .on('change', function(d) {
            eventHighlightingChange.call(context, this, d);
        });

    //Redefine time scale event listener.
    otherControls
        .filter(d => d.option === 'time_scale')
        .select('select')
        .on('change', function(d) {
            timeScaleChange.call(context, this, d);
        });
}
