import drawPolygon from './addSymbols/drawPolygon';

export default function addSymbolsToLegend() {
    const context = this;

    if (this.config.event_symbols && this.config.event_symbols.length) {
        this.config.event_symbols.forEach(event_symbol => {
            const marks = this.wrap
                .selectAll('.legend .legend-color-block')
                .filter(d => {
                    const event = d.label;
                    return event_symbol.event === event || event_symbol.events.indexOf(event) > -1;
                })
                .each(function(d) {
                    const dimensions = this.getBBox();
                    const x = dimensions.x + dimensions.width / 2;
                    const y = dimensions.y + dimensions.height / 2;
                    const sizeFactor = 1.5;
                    d.symbolCoordinates = {
                        x1: x - dimensions.width / 2,
                        x2: x,
                        x3: x + dimensions.width / 2,
                        y1: y - dimensions.height / 2,
                        y2: y,
                        y3: y + dimensions.height / 2
                    };
                    d.color = context.colorScale(d.label);
                });

            drawPolygon.call(this, marks, event_symbol);
        });
    }
}
