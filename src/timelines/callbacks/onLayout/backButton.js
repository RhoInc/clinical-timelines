import enableDisableControls from '../functions/enableDisableControls';
import updateIDfilter from '../functions/updateIDfilter';

export default function backButton() {
    delete this.selected_id;

    enableDisableControls.call(this);
    updateIDfilter.call(this);

    //Hide ID timelines.
    this.containers.IDdetails.classed('ct-hidden', true);
    this.containers.IDtimeline.classed('ct-hidden', true);
    this.containers.listing.classed('ct-hidden', true);

    //Display population timelines.
    this.containers.populationDetails.classed('ct-hidden', false);
    this.wrap.select('svg.wc-svg').classed('ct-hidden', false);

    //Redraw clinical timelines.
    this.draw();

    //Highlight ID dropdown.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => control.description.indexOf(this.config.id_unitPropCased) > -1)
        .style({
            'font-weight': 'bold'
        })
        .transition()
        .delay(500)
        .style({
            'font-weight': 'normal'
        })
        .select('select')
        .node()
        .focus();
}
