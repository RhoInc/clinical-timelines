import { select } from 'd3';
import syncTimeScaleSettings from '../../../../defaults/syncSettings/syncTimeScaleSettings';
import hideInvalidTimeRangeOptions from '../hideInvalidTimeRangeOptions';
import cleanData from '../../functions/cleanData';
import defineData from '../../functions/defineData';
import drawIDtimeline from '../../functions/drawIDtimeline';

export default function timeScale(dropdown, d) {
    const context = this;

    //Update clinical timelines time scale settings
    this.config.time_scale = select(dropdown)
        .select('option:checked')
        .text();
    syncTimeScaleSettings(this.config);

    //Update time range settings.
    this.config.time_range = this[this.config.time_scale + '_time_range'];
    if (
        this.controls.config.inputs
            .find(input => input.option === 'time_range')
            .values.indexOf(this.config.time_range) < 0
    )
        this.config.time_range = 'custom';
    this[this.time_scale + '_time_range'] = this.config.time_range;
    this.time_range = this[this.config.time_scale + '_range'];
    this.full_time_range = this['full_' + this.config.time_scale + '_range'];

    this.controls.wrap.selectAll('#control-time_range option').property('selected', function() {
        return context.config.time_range === this.value;
    });

    //Hide time ranges that represent the other time scale.
    hideInvalidTimeRangeOptions.call(this);

    //Update ID timeline time scale settings
    this.IDtimeline.config.time_scale = this.config.time_scale;
    syncTimeScaleSettings(this.IDtimeline.config);

    //Remove records without time data.
    cleanData.call(this);

    //Redefine data.
    defineData.call(this);

    //Redraw.
    if (this.selected_id) drawIDtimeline.call(this);
    else this.draw();
}
