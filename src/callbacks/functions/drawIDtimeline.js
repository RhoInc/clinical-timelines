import { select } from 'd3';
import { multiply } from 'webcharts';

export default function drawIDtimeline() {
    //Hide population details.
    this.populationDetails.wrap.classed('hidden', true);

    //Display ID information.
    this.IDdetails.wrap.classed('hidden', false);
    this.IDdetails.wrap.select('#ID').text(this.selected_id);

    //Display back button.
    this.backButton.classed('hidden', false);

    //Hide clinical timelines.
    this.wrap.select('svg.wc-svg').classed('hidden', true);

    //Define ID data.
    const longIDdata = this.raw_data.filter(di => di[this.config.id_col] === this.selected_id),
        wideIDdata = this.wide_data.filter(di => di[this.config.id_col] === this.selected_id);

    //Draw row identifier characteristics.
    if (this.config.id_characteristics)
        this.IDdetails.wrap.selectAll('div.characteristic').each(function(d) {
            select(this)
                .select('span')
                .text(wideIDdata[0][d.value_col]);
        });

    //Draw ID timeline.
    this.IDtimeline.wrap.classed('hidden', false);
    this.IDtimeline.wrap.selectAll('*').remove();
    multiply(
        this.IDtimeline,
        longIDdata.filter(
            d =>
                this.currentEventTypes !== 'All'
                    ? this.currentEventTypes.indexOf(d[this.config.event_col]) > -1
                    : true
        ),
        this.config.event_col
    );

    //Draw ID detail listing.
    this.listing.wrap.classed('hidden', false);
    this.listing.draw(
        wideIDdata.filter(
            d =>
                this.currentEventTypes !== 'All'
                    ? this.currentEventTypes.indexOf(d[this.config.event_col]) > -1
                    : true
        )
    );
}
