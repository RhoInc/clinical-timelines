export default function hideMultiples() {
    const context = this;

    //Hide event types not represented in current filter selections.
    const event_col = this.config.event_col,
        eventTypes = this.filters.filter(filter => filter.col === event_col)[0].val;

    this.participantTimeline.wrap.selectAll('.wc-chart').each(function() {
        const multiple = d3.select(this),
            eventType = multiple.select('.wc-chart-title').text();

        multiple.classed(
            'hidden',
            eventTypes instanceof Array ? eventTypes.indexOf(eventType) === -1 : false
        );

        context.listing.draw(
            context.wide_data.filter(
                d =>
                    d[context.config.id_col] === context.selected_id &&
                    (eventTypes instanceof Array
                        ? eventTypes.indexOf(d[context.config.event_col]) > -1
                        : true)
            )
        );
    });
}
