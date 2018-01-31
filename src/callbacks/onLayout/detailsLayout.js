import backButton from './backButton';

export default function detailsLayout() {
    //Add container for population details.
    this.populationDetails.wrap = this.leftSide
        .insert('div', ':first-child')
        .classed('annotation population-details', true);

    //Add container for ID characteristics.
    this.IDdetails.wrap = this.leftSide
        .insert('div', ':first-child')
        .classed('annotation ID-details hidden', true);
    this.IDdetails.wrap
        .selectAll('div.characteristic')
        .data(this.config.id_characteristics)
        .enter()
        .append('div')
        .classed('characteristic', true)
        .html(d => `${d.label}: <span id = '${d.value_col}'></span>`);

    //Add back button to return from ID timeline to clinical timelines.
    this.backButton = this.IDdetails.wrap
        .insert('div', ':first-child')
        .classed('back-button hidden', true);
    this.backButton
        .append('button')
        .html('&#8592; Back')
        .on('click', () => {
            backButton.call(this);
        });
}
