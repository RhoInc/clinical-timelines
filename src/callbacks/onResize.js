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
          //Hide population timelines.
            this.controls.wrap
                .selectAll('.control-group select')
                .property('disabled', true);
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
            multiply(this.participantTimeline, longParticipantData, this.config.event_col);

          //Draw participant detail listing.
            this.listing.wrap
                .classed('hidden', false);
            this.listing
                .draw(wideParticipantData);
        });
}
