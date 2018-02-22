import { select } from 'd3';
import cleanData from '../../functions/cleanData';
import defineData from '../../functions/defineData';
import drawIDtimeline from '../../functions/drawIDtimeline';

export default function timeRange(dropdown, d) {
    //Update time range settings.
    this.config.time_range = select(dropdown)
        .select('option:checked')
        .text();
    this[this.config.time_scale + '_time_range'] = this.config.time_range;
    this.time_range = this.config.time_range.split(' - ').map(d => this.config.time_function(d));
    this[this.config.time_scale + '_range'] = this.time_range;

    //Remove records without time data.
    cleanData.call(this);

    //Redefine data.
    defineData.call(this);

    //Redraw.
    if (this.selected_id) drawIDtimeline.call(this);
    else this.draw();
}
