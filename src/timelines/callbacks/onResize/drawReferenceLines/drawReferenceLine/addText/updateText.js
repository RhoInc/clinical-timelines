export default function updateText(reference_line) {
    reference_line.textDirection =
        reference_line.lineDatum.x1 <= this.plot_width / 2 ? 'right' : 'left';
    reference_line.text
        .attr({
            x: reference_line.lineDatum.x1,
            dx: reference_line.textDirection === 'right' ? 20 : -25,
            'text-anchor': reference_line.textDirection === 'right' ? 'beginning' : 'end'
        })
        .text(reference_line.label);
}
