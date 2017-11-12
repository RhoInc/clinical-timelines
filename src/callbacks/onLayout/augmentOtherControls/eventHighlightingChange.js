import { select } from 'd3';
import drawIDtimeline from '../../functions/drawIDtimeline';

export default function eventHighlightingChange(dropdown, d) {
    //Update event highlighting settings.
    this.config.event_highlighted = select(dropdown)
        .select('option:checked')
        .text();
    this.IDtimeline.config.event_highlighted = this.config.event_highlighted;

    //Redraw.
    if (this.selected_id) drawIDtimeline.call(this);
    else this.draw();
}
