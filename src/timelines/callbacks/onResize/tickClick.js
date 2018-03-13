import { select } from 'd3';
import drawIDtimeline from '../functions/drawIDtimeline';
import updateIDfilter from '../functions/updateIDfilter';
import enableDisableControls from '../functions/enableDisableControls';

export default function tickClick() {
    const context = this;

    this.svg
        .selectAll('.y.axis .tick text')
        .each(function(d) {
            const tick = select(this);
            tick.select('.ct-y-tooltip').remove();
            if (/^-g\d+-/.test(d)) tick.remove();
            else {
                const tooltip = context.config.id_tooltip_col
                    ? context.initial_data.find(di => di[context.config.id_col] === d)[
                          context.config.id_tooltip_col
                      ]
                    : `${context.config.id_unitPropCased}: ${d}`;
                tick
                    .append('title')
                    .classed('ct-y-tooltip', true)
                    .text(tooltip);
            }
        })
        .on('click', d => {
            this.selected_id = d;

            drawIDtimeline.call(this);
            enableDisableControls.call(this);
            updateIDfilter.call(this);
        });
}
