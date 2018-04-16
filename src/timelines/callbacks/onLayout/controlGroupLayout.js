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
            context.config.filters.some(
                filter =>
                    [
                        context.config.id_col,
                        context.config.event_col,
                        context.config.ongo_col
                    ].indexOf(filter.value_col) < 0
            ) &&
            ((context.config.groupings.length && d.option === 'y.groupingLabel') ||
                (!context.config.groupings.length && d.option === 'y.sort'))
        ) {
            const filterRule = context.controls.wrap
                .append('div')
                .classed('ct-horizontal-rule ct-filters ct-ID-filters', true)
                .text(`${context.config.id_unitPropCased} Filters `);
            filterRule
                .append('span')
                .classed('ct-info-icon', true)
                .html('&#x24d8;')
                .attr(
                    'title',
                    `These filters control the set of ${
                        context.config.id_unitPlural
                    } displayed on the y-axis.`
                );
            context.controls.wrap.node().insertBefore(filterRule.node(), this.nextSibling);
        } else if (
            d.value_col === context.config.ongo_col ||
            (d.value_col === context.config.event_col && !context.config.ongo_col)
        ) {
            const filterRule = context.controls.wrap
                .append('div')
                .classed('ct-horizontal-rule ct-filters ct-event-filters', true)
                .text(`Event Filters `);
            filterRule
                .append('span')
                .classed('ct-info-icon', true)
                .html('&#x24d8;')
                .attr('title', 'These filters control the set of events visible in the chart.');
            context.controls.wrap.node().insertBefore(filterRule.node(), this);
        }
    });
}
