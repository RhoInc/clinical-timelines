import { select } from 'd3';
import syncTimeScaleSettings from '../../../../defaults/syncSettings/syncTimeScaleSettings';
import hideInvalidTimeRangeOptions from '../hideInvalidTimeRangeOptions';
import cleanData from '../../functions/cleanData';
import defineData from '../../functions/defineData';
import drawIDtimeline from '../../functions/drawIDtimeline';

export default function timeScale(dropdown, d) {
    //Update clinical timelines time scale settings
    this.config.time_scale = select(dropdown)
        .select('option:checked')
        .text();
    syncTimeScaleSettings(this.config);
    this.time_range = this.config.time_scale === 'date' ? this.date_range : this.day_range;
    this.full_time_range = this.config.time_scale === 'date' ? this.full_date_range : this.full_day_range;

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
