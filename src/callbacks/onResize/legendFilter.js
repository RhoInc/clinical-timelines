export default function legendFilter() {
    //Filter data by clicking on legend.
    const legendItems = this.wrap.selectAll('.legend-item').style({
        cursor: 'pointer',
        'border-radius': '4px',
        padding: '5px',
        'padding-left': '8px'
    }), // legend items
        statusOptions = this.controls.wrap
            .selectAll('.control-group')
            .filter(d => d.label === 'Status')
            .selectAll('.changer option'); // status filter options
    legendItems.selectAll('.legend-mark-text').remove(); // don't need 'em
    legendItems.on('click', function(d) {
        const legendItem = d3.select(this), // clicked legend item
            selected = !legendItem.classed('selected'); // selected boolean
        legendItem.classed('selected', selected); // toggle selected class
        const selectedLegendItems = legendItems
            .filter(function() {
                return d3.select(this).classed('selected');
            })
            .data()
            .map(d => d.label); // selected statuses
        legendItem.style({
            background: selected ? 'lightgray' : 'white'
        }); // set background of legend items corresponding to selected statuses to light gray
        statusOptions
            .property('selected', false)
            .filter(d => selectedLegendItems.indexOf(d) > -1)
            .property('selected', true); // set selected property of status options corresponding to selected statuses to true
        const filtered_data = chart.raw_data.filter(d => {
            let filtered = selectedLegendItems.indexOf(d[chart.config.status_col]) === -1;

            chart.filters
                .filter(filter => filter.col !== chart.config.status_col)
                .forEach(filter => {
                    if (filtered === false && filter.val !== 'All')
                        filtered = typeof filter.val === 'string'
                            ? d[filter.col] !== filter.val
                            : filter.val.indexOf(d[filter.col]) === -1;
                });

            return !filtered;
        }); // define filtered data
        chart.filters.filter(
            filter => filter.col === chart.config.status_col
        )[0].val = selectedLegendItems; // update chart's status filter object
        chart.draw(filtered_data);
    });
}
