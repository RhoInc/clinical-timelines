import { select } from 'd3';
import { multiply } from 'webcharts';

export default function drawIDtimeline() {
    //Hide population details.
    this.clinicalTimelines.containers.populationDetails.classed('ct-hidden', true);

    //Display ID information.
    this.clinicalTimelines.containers.IDdetails.classed('ct-hidden', false);
    this.clinicalTimelines.containers.IDdetails.select('#ID').text(this.selected_id);

    //Hide clinical timelines.
    this.wrap.select('svg.wc-svg').classed('ct-hidden', true);

    //Define ID data.
    const longIDdata = this.long_data.filter(di => di[this.config.id_col] === this.selected_id),
        wideIDdata = this.wide_data.filter(di => di[this.config.id_col] === this.selected_id);

    //Draw row identifier characteristics.
    if (this.config.id_characteristics)
        this.clinicalTimelines.containers.IDdetails.selectAll('div.ct-characteristic').each(
            function(d) {
                select(this)
                    .select('span')
                    .text(wideIDdata[0][d.value_col]);
            }
        );

    //Draw ID timeline.
    this.clinicalTimelines.containers.IDtimeline.classed('ct-hidden', false);
    this.clinicalTimelines.containers.IDtimeline.select('div')
        .selectAll('*')
        .remove();
    multiply(
        this.IDtimeline,
        longIDdata.filter(
            d =>
                this.currentEventTypes !== 'All'
                    ? this.currentEventTypes.indexOf(d[this.config.event_col]) > -1
                    : true
        ),
        this.config.event_col,
        null,
        clinicalTimelines.test
    );

    //Draw ID detail listing.
    this.clinicalTimelines.containers.listing.classed('ct-hidden', false);
    this.clinicalTimelines.containers.listing
        .select('div')
        .selectAll('*')
        .remove();
    this.listing.init(
        wideIDdata.filter(
            d =>
                this.currentEventTypes !== 'All'
                    ? this.currentEventTypes.indexOf(d[this.config.event_col]) > -1
                    : true
        ),
        clinicalTimelines.test
    );
}
