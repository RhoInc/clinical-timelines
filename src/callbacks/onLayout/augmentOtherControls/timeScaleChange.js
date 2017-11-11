import syncWebchartsSettings from '../../../defaults/syncSettings/syncWebchartsSettings';
import defineData from '../../functions/defineData';
import drawIDtimeline from '../../functions/drawIDtimeline';

export default function timeScaleChange() {
    //Sync settings
    syncWebchartsSettings(this.config);
    syncWebchartsSettings(this.IDtimeline.config);
    this.listing.config.cols.forEach(col => {
        if (col === this.config.stdy_col) col = this.config.stdt_col;
        if (col === this.config.endy_col) col = this.config.endt_col;
        if (col === this.config.stdt_col) col = this.config.stdy_col;
        if (col === this.config.endt_col) col = this.config.endy_col;
    });
    this.listing.config.headers.forEach(header => {
        if (header === 'Start Day') header = 'Start Date';
        if (header === 'Stop Day') header = 'Stop Date';
        if (header === 'Start Date') header = 'Start Day';
        if (header === 'Stop Date') header = 'Stop Day';
    });

    //Redefine data.
    defineData.call(this);

    //Redraw.
    if (this.selected_id) drawIDtimeline.call(this);
    else this.draw();
}
