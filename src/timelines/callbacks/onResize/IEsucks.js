import { select } from 'd3';

export default function IEsucks() {
    const inIE = !!this.clinicalTimelines.document.documentMode;
    if (inIE)
        this.svg.selectAll('.line,.point').each(function(d) {
            const mark = select(this);
            const tooltip = mark.select('title');
            const text = tooltip.text().split('\n');
            tooltip.text(text.join('--|--'));
        });
}
