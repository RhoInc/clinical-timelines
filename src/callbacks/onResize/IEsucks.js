export default function IEsucks() {
    if (!!document.documentMode)
        this.svg.selectAll('.line,.point').each(function(d) {
            console.log(d);
            const mark = select(this),
                tooltip = mark.select('title'),
                text = tooltip.text().split('\n');
            tooltip.text(text.join('--|--'));
        });
}
