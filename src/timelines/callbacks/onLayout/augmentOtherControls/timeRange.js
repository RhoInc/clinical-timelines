import { select } from 'd3';
import cleanData from '../../functions/cleanData';
import defineData from '../../functions/defineData';
import drawIDtimeline from '../../functions/drawIDtimeline';

export default function timeRange(dropdown, d) {
    const label = select(dropdown)
        .selectAll('option')
        .filter(function() {
            return this.selected;
        })
        .text();
    const time_range = this.config[this.config.time_scale.toLowerCase() + '_ranges'].find(
        di => di.label === label
    );
    this[this.config.time_scale.toLowerCase() + '_range'] = time_range.domain.slice();
    this.time_range = time_range.domain.slice();

    //Remove records without time data.
    cleanData.call(this);

    //Redefine data.
    defineData.call(this);

    //Redraw.
    if (this.selected_id) drawIDtimeline.call(this);
    else this.draw();
}
