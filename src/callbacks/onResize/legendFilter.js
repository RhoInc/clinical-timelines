export default function legendFilter() {
    //Filter data by clicking on legend.
    const context = this,
        eventTypeFilter = this.filters.filter(filter => filter.col === this.config.event_col)[0],
        eventTypeControl = this.controls.wrap
            .selectAll('.control-group')
            .filter(d => d.label === 'Event Type'),
        eventTypes = eventTypeControl
            .selectAll('.changer option')
            .sort((a, b) => this.config.color_dom.indexOf(a) - this.config.color_dom.indexOf(b)), // event type options
        legendItems = this.wrap
            .selectAll('.legend-item')
            .classed(
                'selected',
                d =>
                    eventTypeFilter.val instanceof Array
                        ? eventTypeFilter.val.indexOf(d.label) > -1
                        : true
            );

    //Add event listener to legend items.
    legendItems.on('click', function(d) {
        const legendItem = d3.select(this), // clicked legend item
            selected = !legendItem.classed('selected'); // selected boolean

        legendItem.classed('selected', selected); // toggle selected class

        const selectedLegendItems = legendItems
            .filter(function() {
                return d3.select(this).classed('selected');
            })
            .data()
            .map(d => d.label); // selected event types

        eventTypes
            .property('selected', false)
            .filter(d => selectedLegendItems.indexOf(d) > -1)
            .property('selected', true); // sync selected options in event type filter with selected legend items

        context.filters.filter(
            filter => filter.col === context.config.event_col
        )[0].val = selectedLegendItems; // update filter object
        context.draw();
    });
}
