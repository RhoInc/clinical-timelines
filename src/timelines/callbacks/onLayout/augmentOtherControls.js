import { select } from 'd3';
import eventHighlighting from './augmentOtherControls/eventHighlighting';
import timeScale from './augmentOtherControls/timeScale';
import timeRange from './augmentOtherControls/timeRange';
import yAxisGrouping from './augmentOtherControls/yAxisGrouping';

export default function augmentOtherControls() {
    const context = this;
    const controls = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type !== 'subsetter')
        .classed('ct-control', true)
        .attr('id', d => `control-${d.option.replace('.', '-')}`);

    //Relabel Y-axis sort options and remove illogical Y-axis grouping options.
    controls
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
    controls
        .filter(d => d.option === 'event_highlighted')
        .select('select')
        .on('change', function(d) {
            eventHighlighting.call(context, this, d);
        });

    //Redefine time scale event listener.
    controls
        .filter(d => d.option === 'time_scale')
        .select('select')
        .on('change', function(d) {
            timeScale.call(context, this, d);
        });

    //Redefine time range event listener.
    controls
        .filter(d => d.option.indexOf('time_range') > -1)
        .selectAll('select')
        .each(function(d) {
            //add event listener
            select(this).on('change', function(d) {
                timeRange.call(context, this, d);
            });

            //add option labels
            const time_ranges = context.config[d.option.split('_')[0] + '_ranges'].slice();
            select(this)
                .selectAll('option')
                .property('label', di => {
                    const time_range = time_ranges.splice(
                        time_ranges.findIndex(dii => dii.time_range === di),
                        1
                    )[0];
                    return time_range.label;
                });
        });

    //Redefine y-axis grouping event listener.
    controls
        .filter(d => d.option === 'y.grouping')
        .select('select')
        .on('change', function(d) {
            yAxisGrouping.call(context, this, d);
        });
}
