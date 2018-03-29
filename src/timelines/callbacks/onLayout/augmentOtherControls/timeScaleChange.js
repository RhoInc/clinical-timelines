import { select } from 'd3';
import syncTimeScaleSettings from '../../../../defaults/syncSettings/syncTimeScaleSettings';
import cleanData from '../../functions/cleanData';
import defineData from '../../functions/defineData';
import drawIDtimeline from '../../functions/drawIDtimeline';

export default function timeScaleChange(dropdown, d) {
    //Update clinical timelines time scale settings
    this.config.time_scale = select(dropdown)
        .select('option:checked')
        .text();
    syncTimeScaleSettings(this.config);
    this.time_range = this.config.time_scale === 'day' ? this.day_range : this.date_range;

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
