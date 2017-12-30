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
        this.clinicalTimelines.containers.populationDetails.classed('ct-hidden', false);

        //Hide ID information.
        this.clinicalTimelines.containers.IDdetails.classed('ct-hidden', true);
        this.clinicalTimelines.containers.IDdetails.select('#ID').text('');

        //Hide clinical timelines.
        this.wrap.select('svg.wc-svg').classed('ct-hidden', false);
        this.draw();

        //Hide ID timeline.
        this.clinicalTimelines.containers.IDtimeline
            .select('div')
            .selectAll('*')
            .remove();
        this.clinicalTimelines.containers.IDtimeline.classed('ct-hidden', true);

        //Draw ID detail listing.
        this.clinicalTimelines.containers.listing
            .select('div')
            .selectAll('*')
            .remove();
        this.clinicalTimelines.containers.listing.classed('ct-hidden', true);
    }

    //Update controls given the current view.
    enableDisableControls.call(this);
}
