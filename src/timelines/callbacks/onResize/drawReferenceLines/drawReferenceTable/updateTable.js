import { nest, select, sum } from 'd3';

export default function updateTable(reference_line) {
    const context = this;
    console.log(context);

    //Update reference table header.
    reference_line.tableHeader.text('Events Overlapping ' + reference_line.label);

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
            group: d.key,
            group_n: sum(d.values, di => di.values),
            class: 'ct-higher-level',
            key: d.key,
            n: sum(d.values, di => di.values)
        });
        d.values.forEach(di => {
            reference_line.flattened_data.push({
                group: d.key,
                group_n: sum(d.values, di => di.values),
                class: 'ct-lower-level',
                key: di.key,
                n: di.values
            });
        });
    });
    reference_line.flattened_data.sort((a, b) => {
        const groupOrder =
            this.config.reference_table_sort === 'frequency'
                ? b.group_n - a.group_n
                : a.group < b.group ? -1 : a.group > b.group ? 1 : 0;
        const classOrder =
            a.class === 'ct-higher-level' ? -1 : b.class === 'ct-higher-level' ? 1 : 0;
        const lowerOrder =
            this.config.reference_table_sort === 'frequency'
                ? b.n - a.n
                : this.config.reference_table_sort === 'event'
                  ? this.config.color_dom.indexOf(a.key) - this.config.color_dom.indexOf(b.key)
                  : a.key < b.key ? -1 : 1;
        return groupOrder || classOrder || lowerOrder;
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
                .attr('class', d => d.class + (d.class === 'ct-lower-level' ? ' ct-indent' : ''))
                .style('font-weight', 'bold')
                .style(
                    'color',
                    d => (d.class === 'ct-lower-level' ? context.colorScale(d.key) : 'black')
                );
            row
                .append('td')
                .text(d.n)
                .attr('class', d => d.class)
                .style('font-weight', 'bold')
                .style(
                    'color',
                    d => (d.class === 'ct-lower-level' ? context.colorScale(d.key) : 'black')
                );
        });
}
