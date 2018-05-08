import { select } from 'd3';

export default function controlGroupLayout() {
    const context = this;

    this.controls.wrap.selectAll('.control-group').each(function(d) {
        const controlGroup = select(this),
            label = controlGroup.selectAll('.wc-control-label, .control-label'),
            description = controlGroup.select('.span-description'),
            container = controlGroup.append('div').classed('ct-label-description', true);

        controlGroup.attr('class', `${controlGroup.attr('class')} ${d.type}`);

        container.node().appendChild(label.node());
        container.node().appendChild(description.node());

        //Add horizontal rule to group controls and filters.
        if (d.value_col === context.config.id_col)
            context.controls.wrap
                .insert('div', ':first-child')
                .classed('ct-controls ct-horizontal-rule', true)
                .text('Controls');
        else if (
            (context.config.groupings.length && d.option === 'y.grouping') ||
            (!context.config.groupings.length && d.option === 'y.sort')
        ) {
            const filterRule = context.controls.wrap
                .append('div')
                .classed('ct-filters ct-horizontal-rule', true)
                .text('Filters');
            context.controls.wrap.node().insertBefore(filterRule.node(), this.nextSibling);
        }
    });
}
