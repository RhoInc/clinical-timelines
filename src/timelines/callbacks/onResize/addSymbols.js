import drawPolygon from './addSymbols/drawPolygon';

export default function addSymbols() {
    if (this.config.event_symbols && this.config.event_symbols.length) {
        this.svg.selectAll('.ct-custom-mark').remove();
        this.config.event_symbols.forEach(event_symbol => {
            const marks = this.svg
                .selectAll('g.point')
                .filter(d => {
                    const event = d.values.raw[0][this.config.event_col];
                    //return event_symbol.event === event || event_symbol.events.indexOf(event) > -1;
                    return (
                        (event_symbol.event === event || event_symbol.events.indexOf(event) > -1) &&
                        this.x_dom[0] <= d.total &&
                        d.total <= this.x_dom[1]
                    );
                })
                .each(d => {
                    const x = this.x(d.values.x);
                    const y = this.y(d.values.y) + this.y.rangeBand() / 2;
                    const sizeFactor = 1.5;
                    d.symbolCoordinates = {
                        x1: x - this.config.mark_thickness * sizeFactor / 2,
                        x2: x,
                        x3: x + this.config.mark_thickness * sizeFactor / 2,
                        y1: y - this.config.mark_thickness * sizeFactor / 2,
                        y2: y,
                        y3: y + this.config.mark_thickness * sizeFactor / 2
                    };
                });

            drawPolygon.call(this, marks, event_symbol);
        });
    }
}
