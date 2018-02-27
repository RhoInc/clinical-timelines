import triangle from './addSymbols/triangle';
import square from './addSymbols/square';
import diamond from './addSymbols/diamond';

export default function addSymbols() {
    this.config.event_symbols
        .forEach(event_symbol => {
            const marks = this.svg.selectAll('g.point')
                .filter(d => {
                    const event = d.values.raw[0][this.config.event_col];
                    return event_symbol.event === event || event_symbol.events.indexOf(event) > -1;
                });
            if (event_symbol.symbol === 'triangle')
                triangle.call(this, marks, event_symbol.direction);
            else if (event_symbol.symbol === 'square')
                square.call(this, marks);
            else if (event_symbol.symbol === 'diamond')
                diamond.call(this, marks);
        });
}
