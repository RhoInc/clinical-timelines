export default function onDraw() {
    const context = this;

    //Re-scale x-axis by misleading webcharts as to what the actual container width is.
    const wrapWidth = +this.wrap.style('width').replace(/[^\d.]/g, ''),
        newWidth = wrapWidth * 0.75;
    this.raw_width = newWidth;
}
