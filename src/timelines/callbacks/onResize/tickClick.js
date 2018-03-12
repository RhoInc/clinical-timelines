import { select } from 'd3';
import drawIDtimeline from '../functions/drawIDtimeline';
import updateIDfilter from '../functions/updateIDfilter';
import enableDisableControls from '../functions/enableDisableControls';

export default function tickClick() {
    const context = this;

    this.svg
        .selectAll('.y.axis .tick')
        .each(function(d) {
            const tooltip = context.config.id_tooltip_col
                ? context.initial_data.find(di => di[context.config.id_col] === d)[
                      context.config.id_tooltip_col
                  ]
                : `${context.config.id_unitPropCased}: ${d}`;
            if (/^-g\d+-/.test(d)) select(this).remove();
            else
                select(this)
                    .append('title')
                    .text(tooltip);
        })
        .on('click', d => {
            this.selected_id = d;

            drawIDtimeline.call(this);
            enableDisableControls.call(this);
            updateIDfilter.call(this);
        });
}
