import { nest, select, sum } from 'd3';

export default function drawReferenceTable(reference_line) {
    //Filter data on events that overlap reference line.
    reference_line.wide_data = this.filtered_wide_data.filter(
        d =>
            this.config.time_function(d[this.config.st_col]) <=
                this.config.time_function(reference_line.timepoint) &&
            this.config.time_function(d[this.config.en_col]) >=
                this.config.time_function(reference_line.timepoint)
    );

    //Nest data by grouping and event type.
    reference_line.nested_data = nest()
        .key(d => d[this.config.y.grouping] || 'All ' + this.config.id_unitPlural)
        .key(d => d[this.config.event_col])
        .rollup(d => d.length)
        .entries(reference_line.wide_data);
    reference_line.flattened_data = [];
    reference_line.nested_data.forEach(d => {
        reference_line.flattened_data.push({
            class: 'ct-higher-level',
            key: d.key,
            n: sum(d.values, di => di.values)
        });
        d.values.forEach(di => {
            reference_line.flattened_data.push({
                class: 'ct-lower-level',
                key: di.key,
                n: di.values
            });
        });
    });

    //Add reference table container and header.
    if (reference_line.container) reference_line.container.remove();
    reference_line.container = this.clinicalTimelines.containers.leftColumn
        .append('div')
        .classed('ct-reference-line-table-container', true);
    reference_line.container
        .append('h3')
        .classed('ct-reference-line-table-header', true)
        .text(reference_line.label);

    //Add reference line table table.
    reference_line.table = reference_line.container
        .append('div')
        .classed('ct-reference-line-table-body', true)
        .append('table');
    reference_line.table
        .append('tbody')
        .selectAll('tr')
        .data(reference_line.flattened_data)
        .enter()
        .append('tr')
        .each(function(d) {
            const row = select(this);
            row
                .append('td')
                .text(d.key)
                .attr('class', d => d.class + (d.class === 'ct-lower-level' ? ' ct-indent' : ''));
            row
                .append('td')
                .text(d.n)
                .attr('class', d => d.class);
        });
}
