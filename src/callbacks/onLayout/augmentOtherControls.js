import { select } from 'd3';
import defineData from '../functions/defineData';
import drawIDtimeline from '../functions/drawIDtimeline';
import timeScaleChange from './augmentOtherControls/timeScaleChange';

export default function augmentOtherControls() {
    const context = this,
        otherControls = this.controls.wrap
            .selectAll('.control-group')
            .filter(d => d.type !== 'subsetter');

    //Relabel Y-axis sort options and remove illogical Y-axis grouping options.
    otherControls
        .each(function(d) {
            if (['Y-axis sort', 'Y-axis grouping'].indexOf(d.description) > -1) {
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
            }
        })
        .on('change', function(d) {
            if (d.description === 'Event highlighting') {
                context.IDtimeline.config.event_highlighted = context.config.event_highlighted;
                if (context.selected_id) drawIDtimeline.call(context);
                else context.draw();
            } else if (d.description === 'X-axis scale') {
                timeScaleChange.call(context);
            }
        });
}
