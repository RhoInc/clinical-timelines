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
        });

    //Redefine y-axis grouping event listener.
    controls
        .filter(d => d.option === 'y.groupingLabel')
        .select('select')
        .on('change', function(d) {
            yAxisGrouping.call(context, this, d);
        });
}
