import enableDisableControls from '../functions/enableDisableControls';
import updateIDfilter from '../functions/updateIDfilter';

export default function backButton() {
    delete this.selected_id;

    enableDisableControls.call(this);
    updateIDfilter.call(this);

    //Hide ID timelines.
    this.clinicalTimelines.containers.IDdetails.classed('ct-hidden', true);
    this.clinicalTimelines.containers.IDtimeline.classed('ct-hidden', true);
    this.clinicalTimelines.containers.listing.classed('ct-hidden', true);

    //Display population timelines.
    this.clinicalTimelines.containers.populationDetails.classed('ct-hidden', false);
    this.wrap.select('svg.wc-svg').classed('ct-hidden', false);

    //Redraw clinical timelines.
    this.draw();
}
