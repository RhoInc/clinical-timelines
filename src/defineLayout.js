import { select } from 'd3';

export default function defineLayout() {
    this.containers.main = select(this.element)
        .append('div')
        .attr('id', 'clinical-timelines');

    /**-------------------------------------------------------------------------------------------\
      Left column
    \-------------------------------------------------------------------------------------------**/

    (this.containers.leftColumn = this.containers.main
        .append('div')
        .classed('ct-column', true)
        .attr('id', 'ct-left-column')),
        //Details container
        (this.containers.details = this.containers.leftColumn
            .append('div')
            .attr('id', 'ct-details'));

    //Add container for population details.
    this.containers.populationDetails = this.containers.details
        .append('div')
        .classed('ct-annotation', true)
        .attr('id', 'ct-population-details');

    //Add container for ID characteristics.
    this.containers.IDdetails = this.containers.details
        .append('div')
        .classed('ct-annotation ct-hidden', true)
        .attr('id', 'ct-ID-details');

    //Add back button to return from ID timeline to clinical timelines.
    this.containers.IDdetails
        .append('div')
        .attr('id', 'ct-back-button')
        .append('button')
        .html('&#8592; Back');

    //Controls container
    this.containers.controls = this.containers.leftColumn.append('div').attr('id', 'ct-controls');

    /**-------------------------------------------------------------------------------------------\
      Right column
    \-------------------------------------------------------------------------------------------**/

    this.containers.rightColumn = this.containers.main
        .append('div')
        .classed('ct-column', true)
        .attr('id', 'ct-right-column');

    //Timelines
    this.containers.timelines = this.containers.rightColumn
        .append('div')
        .attr('id', 'ct-timelines');

    //ID timeline
    this.containers.IDtimeline = this.containers.rightColumn
        .append('div')
        .classed('ct-hidden', true)
        .attr('id', 'ct-ID-timeline');

    //Listing
    this.containers.listing = this.containers.rightColumn
        .append('div')
        .classed('ct-hidden', true)
        .attr('id', 'ct-listing');
}
