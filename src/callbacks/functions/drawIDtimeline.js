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
    const longIDdata = this.long_data.filter(d => d[this.config.id_col] === this.selected_id),
        wideIDdata = this.wide_data.filter(d => d[this.config.id_col] === this.selected_id);

    //Draw ID characteristics.
    if (this.config.id_characteristics) {
        const id_characteristics = this.initial_data.filter(
            d => d[this.config.id_col] === this.selected_id
        )[0];
        this.IDdetails.wrap.selectAll('.characteristic').each(function(d) {
            select(this)
                .select('span')
                .text(id_characteristics[d.value_col]);
        });
    }

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
