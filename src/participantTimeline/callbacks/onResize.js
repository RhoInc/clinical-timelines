import drawReferenceLines from '../../callbacks/onResize/drawReferenceLines';

export default function onResize() {
    const context = this;

    //Hide legend.
    this.wrap.select('.legend').classed('hidden', true);

    //Draw reference lines.
    if (this.config.referenceLines) drawReferenceLines.call(this);
}
