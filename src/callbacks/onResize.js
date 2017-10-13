import { svg } from 'd3';
import { multiply } from 'webcharts';

export default function onResize() {
    const context = this;

  //Draw second x-axis at top of chart.
    const
        topXaxis = svg
            .axis()
            .scale(this.x)
            .orient('top')
            .tickFormat(this.xAxis.tickFormat())
            .innerTickSize(this.xAxis.innerTickSize())
            .outerTickSize(this.xAxis.outerTickSize())
            .ticks(this.xAxis.ticks()[0]),
        topXaxisSelection = this.svg
            .select('g.x2.axis')
            .attr('class', 'x2 axis linear');
        topXaxisSelection
            .call(topXaxis);
        topXaxisSelection
            .select('text.axis-title.top')
            .attr('transform', 'translate(' + this.raw_width / 2 + ',-' + this.config.margin.top + ')');

  //Draw second chart when y-axis tick label is clicked.
    this.svg
        .selectAll('.y.axis .tick')
        .on('click', d => {
          //Update participant filter.
            this.controls.wrap
                .selectAll('.control-group')
                .filter(control => control.value_col === this.config.id_col)
                .selectAll('option')
                .property('selected', option => option === d);
            this.filters
                .filter(filter => filter.col === this.config.id_col)[0]
                .val = d;

          //Hide population details.
            this.populationDetails.wrap.classed('hidden', true);

          //Display participant information.
            this.participantDetails.wrap
                .classed('hidden', false);
            this.participantDetails.wrap
                .select('#participant')
                .text(d);

          //Display back button.
            this.backButton.classed('hidden', false);

          //Hide clinical timelines.
            this.wrap
                .classed('hidden', true);

          //Define participant data.
            const
                longParticipantData = this.raw_data
                    .filter(di => di[this.config.id_col] === d),
                wideParticipantData = this.wide_data
                    .filter(di => di[this.config.id_col] === d);

          //Draw participant timeline.
            this.participantTimeline.wrap
                .classed('hidden', false);
            this.participantTimeline.wrap.selectAll('*').remove();
            multiply(this.participantTimeline, longParticipantData, this.config.event_col);

          //Draw participant detail listing.
            this.listing.wrap
                .classed('hidden', false);
            this.listing
                .draw(wideParticipantData);
        });
}
