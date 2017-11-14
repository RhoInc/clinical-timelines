import drawIDtimeline from '../../functions/drawIDtimeline';
import enableDisableControls from '../../functions/enableDisableControls';

export default function IDchange(select, d) {
    const filter = this.filters.filter(filter => filter.col === d.value_col)[0];

    //Update currently selected ID and toggle view.
    this.selected_id = filter.val !== 'All' ? filter.val : null;

    //Redraw.
    if (this.selected_id && this.selected_id !== 'All') {
        drawIDtimeline.call(this);
    } else {
        delete this.selected_id;

        //Display population details.
        this.populationDetails.wrap.classed('hidden', false);

        //Hide ID information.
        this.IDdetails.wrap.classed('hidden', true);
        this.IDdetails.wrap.select('#ID').text('');

        //Display back button.
        this.backButton.classed('hidden', true);

        //Hide clinical timelines.
        this.wrap.select('svg.wc-svg').classed('hidden', false);
        this.draw();

        //Hide ID timeline.
        this.IDtimeline.wrap.selectAll('*').remove();
        this.IDtimeline.wrap.classed('hidden', true);

        //Draw ID detail listing.
        this.listing.draw([]);
        this.listing.wrap.classed('hidden', true);
    }

    //Update controls given the current view.
    enableDisableControls.call(this);
}
