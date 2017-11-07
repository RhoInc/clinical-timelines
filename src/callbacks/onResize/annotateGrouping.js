import horizontally from './annotateGrouping/horizontally';
import vertically from './annotateGrouping/vertically';

export default function annotateGrouping() {
    const context = this;

    this.svg.selectAll('.grouping').remove();

    if (this.config.grouping_direction === 'horizontal') horizontally.call(this);
    else if (this.config.grouping_direction === 'vertical') vertically.call(this);
}
