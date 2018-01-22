import { nest, select, sum } from 'd3';

export default function updateTable(reference_line) {
    //Update reference table header.
    reference_line.tableHeader.text(reference_line.label);

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
            class: 'poe-higher-level',
            key: d.key,
            n: sum(d.values, di => di.values)
        });
        d.values.forEach(di => {
            reference_line.flattened_data.push({
                class: 'poe-lower-level',
                key: di.key,
                n: di.values
            });
        });
    });

    //Update table.
    reference_line.table.selectAll('tr').remove();
    reference_line.table
        .selectAll('tr')
        .data(reference_line.flattened_data)
        .enter()
        .append('tr')
        .each(function(d) {
            const row = select(this);
            row
                .append('td')
                .text(d.key)
                .attr('class', d => d.class + (d.class === 'poe-lower-level' ? ' poe-indent' : ''));
            row
                .append('td')
                .text(d.n)
                .attr('class', d => d.class);
        });
}
