import { select as d3select } from 'd3';
import drawIDtimeline from '../../functions/drawIDtimeline';
import enableDisableControls from '../../functions/enableDisableControls';

export default function IDchange(select) {
    this.selected_id = d3select(select)
        .select('option:checked')
        .text();
    this.filters.filter(filter => filter.col === this.config.id_col)[0].val = this.selected_id;

    //Redraw.
    if (this.selected_id !== 'All') {
        drawIDtimeline.call(this);
    } else {
        delete this.selected_id;

        //Display population details.
        this.populationDetails.wrap.classed('ct-hidden', false);

        //Hide ID information.
        this.IDdetails.wrap.classed('ct-hidden', true);
        this.IDdetails.wrap.select('#ID').text('');

        //Display back button.
        this.backButton.classed('ct-hidden', true);

        //Hide clinical timelines.
        this.wrap.select('svg.wc-svg').classed('ct-hidden', false);
        this.draw();

        //Hide ID timeline.
        this.IDtimeline.wrap.selectAll('*').remove();
        this.IDtimeline.wrap.classed('ct-hidden', true);

        //Draw ID detail listing.
        this.listing.wrap.selectAll('*').remove();
        this.listing.wrap.classed('ct-hidden', true);
    }

    //Update controls given the current view.
    enableDisableControls.call(this);
}
