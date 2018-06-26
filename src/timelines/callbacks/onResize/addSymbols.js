import drawPolygon from './addSymbols/drawPolygon';

export default function addSymbols() {
    this.svg.selectAll('.ct-custom-mark').remove();
    if (this.config.event_symbols && this.config.event_symbols.length) {
        this.config.event_symbols.forEach(event_symbol => {
            const marks = this.svg
                .selectAll('g.point')
                .filter(d => {
                    const event = d.values.raw[0][this.config.event_col];
                    return (
                        (event_symbol.event === event || event_symbol.events.indexOf(event) > -1) && // point represents an event specified in the event symbol setting
                        this.x_dom[0] <= d.total && // point is within current x-domain
                        d.total <= this.x_dom[1] && // point is within current x-domain
                        this.currentEventTypes.indexOf(event) > -1 // point represents a currently selected event type
                    );
                })
                .each(d => {
                    const x = this.x(d.values.x);
                    const y = this.y(d.values.y) + this.y.rangeBand() / 2;
                    const sizeFactor = 1;
                    d.symbolCoordinates = {
                        x1: x - this.config.mark_thickness * sizeFactor,
                        x2: x,
                        x3: x + this.config.mark_thickness * sizeFactor,
                        y1: y - this.config.mark_thickness * sizeFactor,
                        y2: y,
                        y3: y + this.config.mark_thickness * sizeFactor
                    };
                    d.color = this.colorScale(d.values.raw[0][this.config.event_col]);
                });

            drawPolygon.call(this, marks, event_symbol);
        });
    }
}
