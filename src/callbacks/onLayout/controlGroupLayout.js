import { select } from 'd3';

export default function controlGroupLayout() {
    const context = this;

    this.controls.wrap.selectAll('.control-group').each(function(d) {
        const controlGroup = select(this),
            label = controlGroup.select('.wc-control-label'),
            description = controlGroup.select('.span-description'),
            container = controlGroup.append('div').classed('label-description', true);

        controlGroup.attr('class', `${controlGroup.attr('class')} ${d.type}`);

        container.node().appendChild(label.node());
        container.node().appendChild(description.node());

        //Add horizontal rule to group controls and filters.
        if (d.value_col === context.config.id_col)
            context.controls.wrap
                .insert('div', ':first-child')
                .classed('controls horizontal-rule', true)
                .text('Controls');
        else if (d.option === 'y.grouping') {
            const filterRule = context.controls.wrap
                .append('div')
                .classed('filters horizontal-rule', true)
                .text('Filters');
            context.controls.wrap.node().insertBefore(filterRule.node(), this.nextSibling);
        }
    });
}
