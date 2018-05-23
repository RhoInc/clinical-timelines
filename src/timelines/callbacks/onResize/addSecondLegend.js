import timepoint from './addSecondLegend/timepoint';
import timeInterval from './addSecondLegend/timeInterval';
import ongoingEvent from './addSecondLegend/ongoingEvent';
import { select } from 'd3';

export default function addSecondLegend() {
    const context = this;
    const secondLegend = this.wrap.insert('ul', '.wc-svg').attr('id', 'ct-legend');
    secondLegend
        .selectAll('li')
        .data([
            { label: 'timepoint', function: timepoint },
            { label: 'time interval', function: timeInterval },
            { label: 'ongoing event', function: ongoingEvent }
        ])
        .enter()
        .append('li')
        .classed('ct-legend-item', true)
        .each(function(d) {
            const legendItem = select(this);
            const legendMark = legendItem
                .append('svg')
                .classed('ct-legend-color-block', true)
                .attr({
                    width: 35,
                    height: 15
                });
            d.function.call(context, legendMark);
            const legendLabel = legendItem
                .append('span')
                .classed('ct-legend-label', true)
                .text(d.label);
        });
}
