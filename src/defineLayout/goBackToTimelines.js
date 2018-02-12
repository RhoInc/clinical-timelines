import enableDisableControls from '../timelines/callbacks/functions/enableDisableControls';
import updateIDfilter from '../timelines/callbacks/functions/updateIDfilter';

export default function goBackToTimelines() {
    delete this.timelines.selected_id;

    enableDisableControls.call(this.timelines);
    updateIDfilter.call(this.timelines);

    //Hide ID timelines.
    this.containers.IDdetails.classed('ct-hidden', true);
    this.containers.IDtimeline.classed('ct-hidden', true);
    this.containers.listing.classed('ct-hidden', true);

    //Display population timelines.
    this.containers.populationDetails.classed('ct-hidden', false);
    this.timelines.wrap.select('svg.wc-svg').classed('ct-hidden', false);

    //Redraw clinical timelines.
    this.timelines.draw();
}
