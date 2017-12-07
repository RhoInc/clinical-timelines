import { select } from 'd3';
import syncTimeScaleSettings from '../../../defaults/syncSettings/syncTimeScaleSettings';
import defineData from '../../functions/defineData';
import drawIDtimeline from '../../functions/drawIDtimeline';

export default function timeScaleChange(dropdown, d) {
    //Update clinical timelines time scale settings
    this.config.time_scale = select(dropdown)
        .select('option:checked')
        .text();
    syncTimeScaleSettings(this.config);

    //Update ID timeline time scale settings
    this.IDtimeline.config.time_scale = this.config.time_scale;
    syncTimeScaleSettings(this.IDtimeline.config);

    //Update listing time scale settings
    this.listing.config.cols = this.listing.config.cols.map(col => {
        if (col === this.config.stdy_col) col = this.config.stdt_col;
        else if (col === this.config.stdt_col) col = this.config.stdy_col;
        if (col === this.config.endy_col) col = this.config.endt_col;
        else if (col === this.config.endt_col) col = this.config.endy_col;

        return col;
    });
    this.listing.config.headers = this.listing.config.headers.map(header => {
        if (header === 'Start Day') header = 'Start Date';
        else if (header === 'Start Date') header = 'Start Day';
        if (header === 'Stop Day') header = 'Stop Date';
        else if (header === 'Stop Date') header = 'Stop Day';

        return header;
    });

    //Redefine data.
    defineData.call(this);

    //Redraw.
    if (this.selected_id) drawIDtimeline.call(this);
    else this.draw();
}
