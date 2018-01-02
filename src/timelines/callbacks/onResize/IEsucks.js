export default function IEsucks() {
    const inIE = this.clinicalTimelines.test ? false : !!document.documentMode;
    if (inIE)
        this.svg.selectAll('.line,.point').each(function(d) {
            const mark = select(this),
                tooltip = mark.select('title'),
                text = tooltip.text().split('\n');
            tooltip.text(text.join('--|--'));
        });
}
